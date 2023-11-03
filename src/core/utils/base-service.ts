import { BadRequestException, Logger } from '@nestjs/common';
import { BaseQueryDto } from './base-query.dto';
import { Model, OrderByDirection, Page, QueryBuilder } from 'objection';
import { type OrderBy, type PaginationConverted } from './types/pagination';

export abstract class BaseService {
  serviceName: string;
  logger: Logger;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.logger = new Logger(serviceName);
  }

  /**
   * Generates a complete paginated response object based on the given response and pagination options.
   * @param response - The response object returned by Objection.js' `page` method.
   * @param paginationOptions - The pagination options object.
   * @returns The complete paginated response object.
   */
  getCompletePaginatedResponse(
    response: Page<Model>,
    paginationOptions: PaginationConverted,
  ) {
    if (typeof paginationOptions.limit === 'number') {
      const totalPages = Math.ceil(response.total / paginationOptions.limit);
      return {
        // Objectionjs already returns an 'results' object with the results when using page
        ...response,
        limit: paginationOptions.limit,
        page: paginationOptions.page + 1,
        total_pages: totalPages,
      };
    } else {
      return {
        ...response,
        limit: 'all',
        page: 1,
        total_pages: 1,
      };
    }
  }

  /**
   * Converts a `BaseQueryDto` object into a `PaginationConverted` object.
   * @param queryDto The `BaseQueryDto` object to convert.
   * @returns The converted `PaginationConverted` object.
   */
  createPaginationOptions(queryDto: BaseQueryDto): PaginationConverted {
    let limit: number | string;
    const order = queryDto.orderBy ? queryDto.orderBy : 'created_at:desc';
    if (queryDto.limit && queryDto.limit === 'all') {
      limit = 'all';
    } else {
      // Try to convert the limit to a number, if it fails, set it to 10
      limit = +queryDto.limit ? +queryDto.limit : 10;
    }
    // Subtract 1 from page because the api starts counting from 1 for query params
    const page = queryDto.page ? +queryDto.page - 1 : 0;
    return {
      limit: limit,
      page: page,
      orderBy: this.convertObjectionOrderParams(order),
    };
  }

  /**
   * Retrieves paginated results from a query builder.
   * @param queryBuilder The query builder to retrieve results from.
   * @param paginationOptions The pagination options to apply to the query.
   * @returns A Promise that resolves to a Page of Model objects.
   */
  async getPaginatedResults(
    queryBuilder: QueryBuilder<Model, Model[]>,
    paginationOptions: PaginationConverted,
  ): Promise<Page<Model>> {
    if (typeof paginationOptions.limit === 'number') {
      return await queryBuilder.page(
        paginationOptions.page,
        paginationOptions.limit,
      );
    } else {
      return await queryBuilder.range();
    }
  }

  /**
   * Converts a string of comma-separated order parameters into an array of formatted order objects that can be used by Objection.js.
   * @param orderString - The string of comma-separated order parameters as `column:order`.
   * @returns An array of formatted order objects.
   */
  private convertObjectionOrderParams(orderString: string): OrderBy[] {
    const orderParams = orderString.split(',');
    const orderParamsFormatted = [];
    orderParams.forEach((param) => {
      const [column, orderBy] = param.split(':');
      orderParamsFormatted.push({
        column,
        order: this.validTypeOfOrderBy(orderBy) ? orderBy : 'DESC',
        nulls: 'last',
      });
    });
    return orderParamsFormatted;
  }

  /**
   * Checks if the input string is a valid OrderByDirection value.
   * @param input - The input string to validate.
   * @returns True if the input is a valid OrderByDirection value, false otherwise.
   */
  private validTypeOfOrderBy(input: string): input is OrderByDirection {
    return ['ASC', 'DESC', 'asc', 'desc'].includes(input);
  }
}
