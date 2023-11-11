import { ColumnRef, OrderByDirection, OrderByNulls } from 'objection';

export type PaginationConverted = {
  limit: number | string;
  page: number;
  orderBy: OrderBy[];
};

export type OrderBy = {
  column: ColumnRef;
  order: OrderByDirection;
  nulls: OrderByNulls;
};
