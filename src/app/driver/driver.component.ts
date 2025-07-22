import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/models/team.model';
import { ColumnDef } from '../components/data-table/data-table.component';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent {
}
