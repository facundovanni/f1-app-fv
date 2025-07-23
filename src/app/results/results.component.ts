import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultChartComponent } from '../components/result-chart/result-chart.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ResultsService } from '../services/results.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule  } from 'ng-zorro-antd/grid';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SeasonSelectComponent } from '../components/season-select/season-select.component';

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

  currentSeason = new Date().getFullYear();
  selectedSeason = signal<number>(this.currentSeason);

  pilotStandings = signal<any[]>([]);
  constructorStandings = signal<any[]>([]);
  isLoading = signal<boolean>(false);


  constructor() {
    this.loadData(this.selectedSeason());
  }

  loadData(season: number): void {
    this.isLoading.set(true);
    
    forkJoin({
      pilots: this.resultSrv.getPilotStandings(season),
      constructors: this.resultSrv.getConstructorStandings(season)
    }).subscribe({
      next: ({ pilots, constructors }) => {
        this.pilotStandings.set(pilots);
        this.constructorStandings.set(constructors);
      },
      error: (err) => {
        console.error('Error al cargar datos', err);
      },
      complete: () => this.isLoading.set(false)
    });
  }

  onSeasonChange(year: number): void {
    this.selectedSeason.set(year);
    this.loadData(year);
  }
}
