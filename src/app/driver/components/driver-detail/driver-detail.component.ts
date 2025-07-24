import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule,
    NzCardModule,
    NzGridModule,
    NzSkeletonModule,
    NzButtonModule
  ],
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent {
  private route = inject(ActivatedRoute);
  private noti = inject(NzNotificationService);
  private api = inject(DriverService);
  private location = inject(Location);

  isLoading = signal<boolean>(false);
  hasDriver = signal<boolean>(false);
  data = signal<Driver | null>(null);

  year: number = 0;
  id: string = '';

  constructor() {
    this.year = Number(this.route.snapshot.paramMap.get('season'));   // una vez
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.isLoading.set(true);
    this.api.getDriver(this.id)
      .subscribe({
        next: (response) => {
          this.data.set(response.driver[0]);
          this.isLoading.set(false)
        },
        error: (err) => {
          this.noti.error('Error al cargar datos', err.message);
          this.isLoading.set(false)
        },
      })
  }

  goBack(): void {
    this.location.back();
  }
}
