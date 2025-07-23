import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDrivers, Driver } from 'src/app/models/driver.model';
import { DriverService } from '../services/driver.service';
import { ColumnDef, ActionDef } from '../models/global.model';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  drivers: Driver[] = [];

  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<{ $implicit: Driver }>;

  columns: ColumnDef < Driver > [] =[
    { key: 'driverName', title: 'Nombre' },
  ];

  actions: ActionDef < Driver > [] =[
    {
      label: 'Ver',
      icon: 'eye',
      handler: (row) => {
        this.viewDetails(row.driverId);
      }
    }
  ];

  season = 0;
  currentYear = true;

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const { current } = this.route.snapshot.data as { current: boolean };
    this.currentYear = current;

    this.season = this.currentYear ? new Date().getFullYear() : 1991;
    this.getDrivers();
  }


  getDrivers() {
    this.driverService.getItems(this.season)
      .subscribe((response: DataTableDrivers) => {
        this.drivers = response.drivers;
        console.log('drivers', this.drivers);
      })
  }

  viewDetails(driverId: string): void {
    console.log('Ver detalles de', driverId, 'para la temporada', this.season);
    this.router.navigate(['/drivers', driverId, 'season', this.season]);
  }
}
