import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ActionDef, ColumnDef, DataTableComponent } from '../components/data-table/data-table.component';
import { DataTableTeams, Team } from '../models/team.model';
import { TeamsService } from '../services/team.service';
import { TeamDetailComponent } from './team-detail/team-detail.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, DataTableComponent, RouterLink, TeamDetailComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];

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

  constructor(private teamService: TeamsService, private route: ActivatedRoute, private router: Router) {
  }
  
  ngOnInit(): void {
    const { current } = this.route.snapshot.data as { current: boolean };
    this.currentYear = current;

    this.season = this.currentYear ? new Date().getFullYear() : 1991;
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
}
