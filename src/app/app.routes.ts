import { Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { DriverComponent } from 'src/app/driver/driver.component';

export const routes: Routes = [
    { path: 'teams/current', component: TeamComponent, data: {current: true } },
    { path: 'teams/history', component: TeamComponent, data: {current: false } },
    { path: 'drivers', component: DriverComponent },
    { path: '', redirectTo: 'teams/current', pathMatch: 'full' },
    { path: '**', redirectTo: 'teams/current' }
];
