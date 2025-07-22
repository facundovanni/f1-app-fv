import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-cell',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, RouterLink],
  template: `
    <a nz-button nzType="link" [routerLink]="[link, row[idKey]]">
      <i nz-icon [nzType]="icon"></i>
      <span *ngIf="label">{{ label }}</span>
    </a>
  `
})
export class ActionCellComponent<T = any> {
  @Input() row!: T;
  @Input() idKey: keyof T = 'id' as keyof T;
  @Input() link!: string;
  @Input() label?: string;
  @Input() icon: string = 'eye';
}
