import { TemplateRef } from "@angular/core";

export interface DataTableResponse {
  api: string;
  url: string;
  limit: number;
  offset: number;
  total: number;
}

export interface Filter {
  text: string,
  value: any[]
}

export interface Order {
  field: string;
  dir: 'asc' | 'desc';
}

export interface ColumnDef<T> {
  key: keyof T & string;
  title: string;
  template?: TemplateRef<{ $implicit: T;[key: string]: any }>;
  filters?: Filter[];
  filterMultiple?: boolean;
  sortable?: boolean;
}

export interface ActionDef<T> {
  label: string;
  icon: string;
  handler: (row: T, context: Record<string, any>) => void;
}

export interface Pagination {
  total: number,
  pageSize: number,
  pageIndex: number,
}



export interface ServerQuery {
  page: number;
  size: number;
  sort?: Order[] | undefined;
  filters?: any;//Record<string, (string | number | boolean)[]>;
  search?: string;
  searchBy?: string[];
}