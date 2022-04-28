import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactElement } from 'react';
export interface PaginationParams {
  _limit: number,
  _page: number,
  _totalRows: number
}

export interface ListResponse<T> {
  data: T[],
  pagination: PaginationParams
}

export interface ErrorResponse {
  status: number,
  message: string,
  errors?: {
    [key: string]: any
  }
}
export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface ModuleList {
  id: string | number;
  name: string;
  path: string;
  selected?: boolean;
  icon?: string;
  component: string
}