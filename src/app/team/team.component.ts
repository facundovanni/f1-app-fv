import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTableTeams, Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { ColumnDef, ActionDef, ServerQuery, Pagination } from '../models/global.model';
import { TableComponent } from '../components/table/table.component';
import { ActionCellComponent } from '../components/action-cell/action-cell.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SeasonSelectComponent } from '../components/season-select/season-select.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TableComponent, ActionCellComponent, RouterLink, TeamDetailComponent, SeasonSelectComponent,NzCardModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  data: Team[] = [];
  isLoading = signal<boolean>(false);
  pagination: Pagination = { pageIndex: 1, pageSize: 30, total: 0 }; // Hay un error en la api que al mandar limit menor no trae el total
  query: ServerQuery = { page: this.pagination.pageIndex, size: this.pagination.pageSize };

  @ViewChild('urlTemplate', { static: true }) urlTemplate!: TemplateRef<{ $implicit: Team }>;

  columns: ColumnDef<Team>[] = [];

  actions: ActionDef<Team>[] = [
    {
      label: 'Ver',
      icon: 'eye',
      handler: (row) => {
        this.viewDetails(row.teamId);
      }
    }
  ];

  season = 0;
  currentYear = true;

  constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'teamName', title: 'Nombre' },
      { key: 'teamNationality', title: 'País de origen' },
      { key: 'firstAppeareance', title: 'Debut' },
      { key: 'constructorsChampionships', title: 'Títulos Constructores' },
      { key: 'driversChampionships', title: 'Títulos de pilotos' },
      { key: 'url', title: 'URL', template: this.urlTemplate },
    ];
    const { current } = this.route.snapshot.data as { current: boolean };
    this.currentYear = current;

    this.season = this.currentYear ? new Date().getFullYear() : 1991;
    this.getTeams(this.query);
  }


  getTeams(q: ServerQuery) {
    this.query = q;
    this.isLoading.set(true);
    this.teamService.getItems(q, this.season)
      .subscribe((response: DataTableTeams) => {
        this.data = response.teams;
        this.pagination = { pageIndex: q.page, pageSize: q.size, total: response.total };
        this.isLoading.set(false);
      })
  }

  viewDetails(teamId: string): void {
    console.log('Ver detalles de', teamId, 'para la temporada', this.season);
    this.router.navigate(['/teams', teamId, 'season', this.season]);
  }

  onSeasonChange(year: number): void {
    this.season = year;
    this.getTeams(this.query);
  }
}
