import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDrivers, Driver, DriverSearchParams } from 'src/app/models/driver.model';
import { DriverService } from '../services/driver.service';
import { ColumnDef, ActionDef, ServerQuery, Pagination } from '../models/global.model';
import { TableComponent } from '../components/table/table.component';
import { ActionCellComponent } from '../components/action-cell/action-cell.component';
import { DriverSearchFormComponent } from './components/driver-search-form/driver-search-form.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, TableComponent, ActionCellComponent, DriverSearchFormComponent],
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
        // this.viewDetails(row.driverId);

      }
    }
  ];
  pagination: Pagination = { pageIndex: 1, pageSize: 30, total: 0 }; // Hay un error en la api que al mandar limit menor no trae el total
  query: ServerQuery = { page: this.pagination.pageIndex, size: this.pagination.pageSize };
  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'name', title: 'Nombre', sortable: true },
      { key: 'surname', title: 'Apellido', sortable: true },
      { key: 'url', title: 'Url', template: this.urlTpl }
    ];
    this.getDrivers(this.query);
  }


  getDrivers(q: ServerQuery, data?: DriverSearchParams) {
    this.query = q;
    this.loading = true;
    this.driverService.getItems(q, data)
      .subscribe((response: DataTableDrivers) => {
        this.data = response.drivers;
        this.pagination = { pageIndex: q.page, pageSize: q.size, total: response.total };
        this.loading = false;
      })
  }

  search(data: any) {
    this.getDrivers(this.query, data)
  }

  // viewDetails(driverId: string): void {
  //   console.log('Ver detalles de', driverId, 'para la temporada', this.season);
  //   this.router.navigate(['/drivers', driverId, 'season', this.season]);
  // }
}
