import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ColumnDef, ActionDef, Pagination, ServerQuery, Filter, Order } from 'src/app/models/global.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T = any> {
  @Input() columns: ColumnDef<T>[] = [];
  @Input() actions: ActionDef<T>[] = [];
  @Input() data: T[] = [];

  @Input() extraContext: Record<string, any> = {};

  @Input() loading: boolean = false;

  @Input() pagination: Pagination = {
    pageIndex: 1,
    pageSize: 10,
    total: 0
  };

  @Input() externalFilters: Filter | null = null;

  @Output() queryChange = new EventEmitter<ServerQuery>();

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;

    const sorts: Order[] = sort
      .filter(s => s.value)
      .map(s => ({
        field: s.key as string,
        dir: s.value === 'ascend' ? 'asc' : 'desc'
      }));

    const combinedFilters = {
      ...(filter ?? {}),
      ...(this.externalFilters ?? {})
    };

    const query: ServerQuery = {
      page: pageIndex,
      size: pageSize,
      sort: sorts.length ? sorts : undefined,
      filters: Object.keys(combinedFilters).length ? combinedFilters : undefined
    };

    this.queryChange.emit(query);
  }

  getContext(row: T): { $implicit: T } & Record<string, any> {
    return { $implicit: row, ...this.extraContext };
  }
}
