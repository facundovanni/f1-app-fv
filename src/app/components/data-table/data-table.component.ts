import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

export interface ColumnDef<T> {
  key: keyof T;
  title: string;
  template?: TemplateRef<{ $implicit: T }>;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [ CommonModule, NzTableModule ],
  template: `
    <nz-table [nzData]="data">
      <thead>
        <tr>
          <th *ngFor="let col of columns">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let col of columns">
            <ng-container *ngIf="col.template; else defaultCell"
                          [ngTemplateOutlet]="col.template"
                          [ngTemplateOutletContext]="{ $implicit: row }">
            </ng-container>
            <ng-template #defaultCell>{{ row[col.key] }}</ng-template>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class DataTableComponent<T = any> {
  @Input() columns: ColumnDef<T>[] = [];
  @Input() data: T[] = [];
}