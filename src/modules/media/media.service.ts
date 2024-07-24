import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaModel } from './entities/media.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { S3Service } from '../s3/s3.service';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { BaseService } from 'src/core/utils/base-service';
import { MediaQueryDto } from './dto/media-query.dto';

enum AttachTypeActions {
  CREATE,
  UPDATE,
}

@Injectable()
export class MediaService extends BaseService {
  constructor(
    @Inject(MediaModel.name)
    private readonly mediaModel: ModelClass<MediaModel>,
    private readonly s3service: S3Service,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(MediaService.name);
  }

  /**
   * Creates a new media file and saves it to the specified path using the provided file and metadata.
   * @param file - The file to be uploaded.
   * @param createMediaDto - The metadata for the media file.
   * @returns A Promise that resolves to the newly created media file.
   * @throws InternalServerErrorException if there was an error uploading the file to the storage provider.
   */
  async create(file: Express.Multer.File, createMediaDto: CreateMediaDto) {
    // Validate the file type according to the media record attach_type field
    this.validateFileType(file.mimetype, createMediaDto.attach_type);
    const sanedFileName = this.sanitizeFileName(file.originalname);
    const uploadedFile = await this.s3service.uploadFile(
      file,
      createMediaDto.path,
      sanedFileName,
    );
    if (uploadedFile.success) {
      return await this.dbTrxService.databaseTransaction(async (trx) => {
        const createdMedia = await this.mediaModel.query(trx).insert({
          filename: sanedFileName,
          size: file.size,
          path: uploadedFile.fileKey,
          dir: createMediaDto.path,
          type: file.mimetype,
          key: uploadedFile.fileKey,
          attach_type: createMediaDto.attach_type,
        });
        return await this.findOne(createdMedia.$id(), trx);
      }, this.logger);
    } else {
      this.logger.error('Error uploading file to S3', uploadedFile.error);
      const error: IGeneralError = {
        statusCode: 500,
        message: 'Internal error while uploading file to storage provider',
        error: 'Internal server error',
      };
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const mediaToDelete = await this.findOne(id);
    if (mediaToDelete) {
      const deletedFile = await this.s3service.deleteFile(mediaToDelete.key);
      if (deletedFile.success) {
        return await this.dbTrxService.databaseTransaction(async (trx) => {
          await mediaToDelete.$query(trx).delete();
          return {
            message: `Media with id ${id} deleted successfully`,
            media: mediaToDelete,
          };
        }, this.logger);
      } else {
        this.logger.error('Error deleting file from S3', deletedFile.error);
        const error: IGeneralError = {
          statusCode: 500,
          message: 'Internal error while deleting file from storage provider',
          error: 'Internal server error',
        };
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteKeyFileByMediaId(
    mediaId: number,
    trx?: Transaction,
    deleteDbRecord = false,
  ) {
    const mediaToDelete = await this.findOne(mediaId);
    if (mediaToDelete) {
      const deletedFile = await this.s3service.deleteFile(mediaToDelete.key);
      if (deletedFile.success) {
        if (deleteDbRecord) {
          await mediaToDelete.$query(trx).delete();
        }
        return {
          message: `Media with id ${mediaId} deleted successfully`,
          media: mediaToDelete,
        };
      }
      if (!deletedFile.success) {
        this.logger.error('Error deleting file from S3', deletedFile.error);
        const error: IGeneralError = {
          statusCode: 500,
          message: 'Internal error while deleting file from storage provider',
          error: 'Internal server error',
        };
        throw new InternalServerErrorException(error);
      }
    }
  }

  async update(
    id: number,
    file: Express.Multer.File,
    _updateMediaDto: UpdateMediaDto,
  ) {
    const sanedFileName = this.sanitizeFileName(file.originalname);
    const mediaRecord = await this.mediaModel.query().findById(id);
    // Validate the file type according to the media record attach_type field
    // If the file type is not valid, throw an error
    if (mediaRecord) {
      // Validate the file type according to the media record attach_type field
      this.validateFileType(
        file.mimetype,
        mediaRecord.attach_type,
        AttachTypeActions.UPDATE,
      );
      const deletedFile = await this.s3service.deleteFile(mediaRecord.key);
      const updatedFile = await this.s3service.uploadFile(
        file,
        mediaRecord.dir,
        sanedFileName,
      );
      if (deletedFile.success && updatedFile.success) {
        return await this.dbTrxService.databaseTransaction(async (trx) => {
          await mediaRecord.$query(trx).patch({
            filename: sanedFileName,
            size: file.size,
            path: updatedFile.fileKey,
            type: file.mimetype,
            key: updatedFile.fileKey,
          });
          return await this.findOne(mediaRecord.$id(), trx);
        }, this.logger);
      } else {
        this.logger.error('Error uploading file to S3', updatedFile.error);
        const error: IGeneralError = {
          statusCode: 500,
          message: 'Internal error while updating file in storage provider',
          error: 'Internal server error',
        };
        throw new InternalServerErrorException(error);
      }
    }
  }

  async findAllAdmin(queryDto: MediaQueryDto) {
    const paginationOptions = this.createPaginationOptions(queryDto);
    const resultsQueryBuilder = this.mediaModel
      .query()
      .select('*')
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy(paginationOptions.orderBy);
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: number, trx?: Transaction) {
    return await this.mediaModel.query(trx).select('*').findById(id);
  }

  /**
   * Sanitizes a file name by replacing any non-alphanumeric characters with underscores and adding a timestamp to the end of the file name.
   * If the file name already has an extension, the timestamp will be added before the extension.
   * @param fileName - The name of the file to sanitize.
   * @returns The sanitized file name.
   */
  private sanitizeFileName(fileName: string): string {
    const fileParts = fileName.split('.');
    // If no extension is found, just add a timestamp to the file name
    if (fileParts.length === 1) {
      return `${fileParts[0].replace(
        /[^a-zA-Z0-9.]/g,
        '_',
      )}_${new Date().toISOString()}`;
    }
    const fileExtension = fileParts.pop();
    const fileNameWithoutExtension = fileParts.join('.');
    return `${fileNameWithoutExtension.replace(
      /[^a-zA-Z0-9.]/g,
      '_',
    )}_${new Date().toISOString()}.${fileExtension}`;
  }

  private validateFileType(
    fileType: string,
    attachType: string,
    action?: AttachTypeActions,
  ) {
    const allowedFileTypes = {
      manual: 'application/pdf',
      article: 'text/markdown',
      library: 'application/pdf',
    };
    if (fileType !== allowedFileTypes[attachType]) {
      const invalidFileError: IGeneralError = {
        statusCode: 400,
        message: `Invalid file type for the specified attach type (or specified invalid attach type). Expected file type: ${allowedFileTypes[attachType]}`,
        error: 'Bad request',
      };
      if (action === AttachTypeActions.UPDATE)
        invalidFileError.message = `Invalid file type for the existing attach type. Expected file type: ${allowedFileTypes[attachType]}`;
      throw new BadRequestException(invalidFileError);
    }
  }

  queryFilters(
    queryDto: MediaQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.path) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.path)}%`,
      );
    }
    return builder;
  }
}
