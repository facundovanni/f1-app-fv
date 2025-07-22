import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DriverComponent } from 'src/app/driver/driver.component';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamComponent, DriverComponent, NzIconModule, NzMenuModule, NzLayoutModule, RouterLink, RouterLinkActive, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'f1-app-fv';

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
    }
  ];

}
