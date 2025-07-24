import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject, signal, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SeasonSelectComponent } from '../components/season-select/season-select.component';
import { TableComponent } from '../components/table/table.component';
import { ActionCellComponent } from '../components/action-cell/action-cell.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataTableTeams, Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { ColumnDef, ActionDef, ServerQuery, Pagination } from '../models/global.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ActionCellComponent,
    RouterLink,
    SeasonSelectComponent,
    NzCardModule
  ],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{
  private teamService = inject(TeamService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noti = inject(NzNotificationService);

  @ViewChild('urlTemplate', { static: true })
  urlTemplate!: TemplateRef<{ $implicit: Team }>;

  data = signal<Team[]>([]);
  isLoading = signal(false);
  pagination = signal<Pagination>({ pageIndex: 1, pageSize: 30, total: 0 });
  query = signal<ServerQuery>({ page: 1, size: 30 });

  currentYear = signal(true);
  season = signal(new Date().getFullYear());

  columns: ColumnDef<Team>[] = [];
  actions: ActionDef<Team>[] = [
    { label: 'Ver', icon: 'eye', handler: row => this.viewDetails(row.teamId) }
  ];

  constructor() {
    

    effect(() => {
      const q = this.query();
      const s = this.season();
      this.loadTeams(q, s);
    }, { allowSignalWrites: true });
  }
  ngOnInit(): void {
    const data = this.route.snapshot.data as { current: boolean };
    this.currentYear.set(data.current);
    
    this.columns = [
      { key: 'teamName', title: 'Nombre' },
      { key: 'teamNationality', title: 'País de origen' },
      { key: 'firstAppeareance', title: 'Debut' },
      { key: 'constructorsChampionships', title: 'Títulos Constructores' },
      { key: 'driversChampionships', title: 'Títulos de pilotos' },
      { key: 'url', title: 'URL', template: this.urlTemplate }
    ];
  }

  private loadTeams(q: ServerQuery, season: number) {
    this.isLoading.set(true);
    this.teamService.getItems(q, season).subscribe({
      next: (resp: DataTableTeams) => {
        this.data.set(resp.teams);
        this.pagination.set({ pageIndex: q.page, pageSize: q.size, total: resp.total });
        this.isLoading.set(false);
      },
      error: err => {
        this.data.set([]);
        this.noti.error('Error al cargar', err.message);
        this.isLoading.set(false);
      }
    });
  }

  viewDetails(teamId: string) {
    this.router.navigate(['/teams', teamId, 'season', this.season()]);
  }

  onSeasonChange(year: number) {
    this.season.set(year);
    this.query.update(q => ({ ...q, page: 1 }));
  }

  onQueryChange(q: ServerQuery) {
    this.query.set(q);
  }
}