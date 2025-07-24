import { Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { DriverComponent } from 'src/app/driver/driver.component';
import { TeamDetailComponent } from './team/components/team-detail/team-detail.component';
import { ResultsComponent } from './results/results.component';
import { DriverDetailComponent } from './driver/components/driver-detail/driver-detail.component';

export const routes: Routes = [
    { path: 'teams/current', component: TeamComponent, data: { current: true } },
    { path: 'teams/history', component: TeamComponent, data: { current: false } },
    { path: 'teams/:id/season/:season', component: TeamDetailComponent },
    { path: 'drivers', component: DriverComponent },
    { path: 'drivers/:id', component: DriverDetailComponent },
    { path: 'results', component: ResultsComponent },
    { path: '', redirectTo: 'teams/current', pathMatch: 'full' },
    { path: '**', redirectTo: 'teams/current' }
];
