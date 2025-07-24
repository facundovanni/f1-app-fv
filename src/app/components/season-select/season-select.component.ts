import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-season-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule,],
  templateUrl: './season-select.component.html',
  styleUrls: ['./season-select.component.scss'],
})
export class SeasonSelectComponent {

  private noti = inject(NzNotificationService);

  @Input() disabled = false;
  @Input() width = '200px';
  @Input() value= 0;
  @Input() showCurrentLabel = false;
  @Input() isHistoric = false;
  @Input() allowClear= false;

  @Output() seasonChange = new EventEmitter<number>();

  seasons = signal<number[]>([]);
  loading = signal<boolean>(true);
  currentLabel= signal<boolean>(false);
  private service = inject(SeasonService);
  

  constructor() {
    this.service.getSeasons().subscribe({
      next: (list) => {
        if(this.isHistoric){
          list = list.slice(1);
        }
        this.seasons.set(list);
        this.loading.set(false);
        this.onSelect(list[0]);
        
      },
      error: (err) => {
        this.noti.error('Error al cargar datos', err.message);
        this.loading.set(false);
      },
    });
  }

  onSelect(year: number): void {
    this.currentLabel.set(this.showCurrentLabel && (year === new Date().getFullYear()));
    this.seasonChange.emit(year);    
  }
}

