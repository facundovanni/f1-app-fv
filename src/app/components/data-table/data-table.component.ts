// src/app/components/data-table/data-table.component.ts
import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface ColumnDef<T> {
  key: keyof T;
  title: string;
  template?: TemplateRef<{ $implicit: T; [key: string]: any }>;
}

export interface ActionDef<T> {
  label: string;
  icon: string;
  handler: (row: T, context: Record<string, any>) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule
  ],
  template: `
    <nz-table [nzData]="data">
      <thead>
        <tr>
          <!-- Cabeceras normales -->
          <th *ngFor="let col of columns">{{ col.title }}</th>
          <!-- Cabecera de acciones -->
          <th *ngIf="actions?.length">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <!-- Celdas normales -->
          <td *ngFor="let col of columns">
            <ng-container *ngIf="col.template; else defaultCell"
                          [ngTemplateOutlet]="col.template"
                          [ngTemplateOutletContext]="getContext(row)">
            </ng-container>
            <ng-template #defaultCell>{{ row[col.key] }}</ng-template>
          </td>
          <!-- Celdas de acciones -->
          <td *ngIf="actions?.length">
            <button
              *ngFor="let act of actions"
              nz-button nzType="link"
              (click)="act.handler(row, extraContext)">
              <i nz-icon [nzType]="act.icon"></i>
              {{ act.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class DataTableComponent<T = any> {
  @Input() columns: ColumnDef<T>[] = [];
  @Input() data: T[] = [];
  /** Contexto extra (p.e. season, user, etc.) que requiere tu callback */
  @Input() extraContext: Record<string, any> = {};
  /** Lista de acciones a mostrar en la última columna */
  @Input() actions: ActionDef<T>[] = [];

  getContext(row: T): { $implicit: T } & Record<string, any> {
    return { $implicit: row, ...this.extraContext };
  }
}
