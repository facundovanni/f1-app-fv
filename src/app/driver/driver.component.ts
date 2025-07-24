import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataTableDrivers, Driver, DriverSearchParams } from 'src/app/models/driver.model';
import { ActionCellComponent } from '../components/action-cell/action-cell.component';
import { TableComponent } from '../components/table/table.component';
import { ActionDef, ColumnDef, Pagination, ServerQuery } from '../models/global.model';
import { DriverService } from '../services/driver.service';
import { DriverSearchComponent } from './components/driver-search/driver-search.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, TableComponent, ActionCellComponent, DriverSearchComponent, NzCardModule, DriverDetailComponent],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  data: Driver[] = [];
  loading = false;
  @ViewChild('urlTemplate', { static: true }) urlTpl!: TemplateRef<any>;

  columns: ColumnDef<Driver>[] = [];

  actions: ActionDef<Driver>[] = [
    {
      label: 'Ver',
      icon: 'eye',
      handler: (row) => {
        this.viewDetails(row.driverId);
      }
    }
  ];
  pagination: Pagination = { pageIndex: 1, pageSize: 30, total: 0 }; // Hay un error en la api que al mandar limit menor no trae el total
  query: ServerQuery = { page: this.pagination.pageIndex, size: this.pagination.pageSize };
  constructor(private driverService: DriverService, private router: Router, private noti: NzNotificationService) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'name', title: 'Nombre'},
      { key: 'surname', title: 'Apellido'},
      { key: 'url', title: 'Url', template: this.urlTpl }
    ];
    this.getDrivers(this.query);
  }


  getDrivers(q: ServerQuery, data?: DriverSearchParams) {
    this.query = q;
    this.loading = true;
    this.driverService.getItems(q, data)
      .subscribe({
        next: (response: DataTableDrivers) => {
          this.data = response.drivers;
          this.pagination = { pageIndex: q.page, pageSize: q.size, total: response.total };
          this.loading = false;
        },
        error: (err) => {
          this.noti.error('Error al cargar los datos', err.message);
          this.data = [];
          this.loading = false
        }
      });
  }

  search(data: any) {
    this.getDrivers(this.query, data)
  }

  viewDetails(driverId: string): void {
    this.router.navigate(['/drivers', driverId]);
  }
}
