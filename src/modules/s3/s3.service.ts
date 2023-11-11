import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_KEY_SECRET,
      },
    });
  }
  s3Client: S3Client;

  async uploadFile(file: Express.Multer.File, path: string, filename: string) {
    const finalPath = path ? `${path}/` : 'nocat/';
    const fileKey = `${finalPath}${filename}`;
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return {
        success: true,
        fileKey,
      };
    } catch (error) {
      return {
        message: 'Internal error while uploading file',
        success: false,
        error,
      };
    }
  }

  async deleteFile(fileKey: string) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        }),
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        message: 'Internal error while deleting file',
        success: false,
        error,
      };
    }
  }
}
