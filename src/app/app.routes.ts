import { Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { DriverComponent } from 'src/app/driver/driver.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';

export const routes: Routes = [
    { path: 'teams/current', component: TeamComponent, data: { current: true } },
    { path: 'teams/history', component: TeamComponent, data: { current: false } },
    { path: 'teams/:id/season/:season', component: TeamDetailComponent },
    { path: 'drivers', component: DriverComponent },
    { path: '', redirectTo: 'teams/current', pathMatch: 'full' },
    { path: '**', redirectTo: 'teams/current' }
];
