import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TeamDetails } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { Location } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule,
    NzCardModule,
    NzGridModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzButtonModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent {
  private route = inject(ActivatedRoute);
  private noti = inject(NzNotificationService);
  private api = inject(TeamService);
  private location = inject(Location);

  isLoading = signal<boolean>(false);
  hasDriver = signal<boolean>(false);
  teamDetails = signal<TeamDetails | null>(null);

  year: number = 0;
  teamId: string = '';

  constructor() {
    this.year = Number(this.route.snapshot.paramMap.get('season'));   // una vez
    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';

    this.isLoading.set(true);
    this.api.getDriversByTeam(this.teamId, this.year)
      .subscribe({
        next: (data) => {
          this.teamDetails.set(data);
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
