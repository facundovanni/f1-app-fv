import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DriverComponent } from 'src/app/driver/driver.component';
import { ResultsComponent } from './results/results.component';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamComponent, DriverComponent, ResultsComponent, NzIconModule, NzMenuModule, NzLayoutModule,
    RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'f1-app-fv';

  menuTheme = signal<'dark' | 'light'>('dark');

  menus = [
    {
      level: 1,
      title: 'Equipos',
      icon: 'upload',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Actual',
          selected: false,
          disabled: false,
          link: '/teams/current',
        },
        {
          level: 2,
          title: 'Histórico',
          selected: false,
          disabled: false,
          link: '/teams/history',
        }
      ]
    },
    {
      level: 1,
      title: 'Pilotos',
      icon: 'user',
      open: false,
      selected: true,
      disabled: false,
      link: '/drivers'
    },
    {
      level: 1,
      title: 'Resultados',
      icon: 'user',
      open: false,
      selected: true,
      disabled: false,
      link: '/results'
    }
  ];

}
