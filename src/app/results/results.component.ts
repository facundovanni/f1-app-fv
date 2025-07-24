import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { forkJoin } from 'rxjs';
import { ResultChartComponent } from '../components/result-chart/result-chart.component';
import { SeasonSelectComponent } from '../components/season-select/season-select.component';
import { ResultsService } from '../services/results.service';
import { DriverChampionshipStanding } from '../models/driver.model';
import { TeamChampionshipStanding } from '../models/team.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    NzSelectModule,
    NzCardModule,
    NzGridModule,
    NzSpinModule,
    ResultChartComponent,
    SeasonSelectComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  private resultSrv = inject(ResultsService);
  private noti = inject(NzNotificationService);

  currentSeason = new Date().getFullYear();
  selectedSeason = signal<number>(this.currentSeason);

  pilotStandings = signal<DriverChampionshipStanding[]>([]);
  constructorStandings = signal<TeamChampionshipStanding[]>([]);
  isLoading = signal<boolean>(false);


  loadData(season: number): void {
    this.isLoading.set(true);

    forkJoin({
      pilots: this.resultSrv.getPilotStandings(season),
      constructors: this.resultSrv.getConstructorStandings(season)
    }).subscribe({
      next: ({ pilots, constructors }) => {
        this.pilotStandings.set(pilots);
        this.constructorStandings.set(constructors);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.noti.error('Error al cargar datos', err.message);
        this.pilotStandings.set([]);
        this.constructorStandings.set([]);
        this.isLoading.set(false)
      },
    });
  }

  onSeasonChange(year: number): void {
    this.selectedSeason.set(year);
    this.loadData(year);
  }
}
