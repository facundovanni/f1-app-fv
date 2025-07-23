import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTableTeams, Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ColumnDef, ActionDef } from '../models/global.model';
import { TableComponent } from '../components/table/table.component';
import { ActionCellComponent } from '../components/action-cell/action-cell.component';
import { SeasonSelectComponent } from '../components/season-select/season-select.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TableComponent,ActionCellComponent, RouterLink, TeamDetailComponent, SeasonSelectComponent,NzCardModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];
  isLoading = signal<boolean>(false);

  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<{ $implicit: Team }>;

  columns: ColumnDef<Team>[] = [
    { key: 'teamName', title: 'Nombre' },
    { key: 'teamNationality', title: 'Nacionalidad' },
    { key: 'url', title: 'URL',  },
  ];

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
    const { current } = this.route.snapshot.data as { current: boolean };
    this.currentYear = current;

    this.season = new Date().getFullYear();
    this.getTeams();
  }


  getTeams() {
    this.teamService.getItems(this.season)
      .subscribe((response: DataTableTeams) => {
        this.teams = response.teams;
        console.log('teams', this.teams);
      })
  }

  viewDetails(teamId: string): void {
    console.log('Ver detalles de', teamId, 'para la temporada', this.season);
    this.router.navigate(['/teams', teamId, 'season', this.season]);
  }

  onSeasonChange(year: number): void {
    // this.selectedSeason.set(year);
    this.season = year;
    this.getTeams();
  }
}
