import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-season-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule,],
  templateUrl: './season-select.component.html',
  styleUrls: ['./season-select.component.scss'],
})
export class SeasonSelectComponent {

  @Input() disabled = false;
  @Input() width = '200px';
  @Input() value= 0;

  @Output() seasonChange = new EventEmitter<number>();

  seasons = signal<number[]>([]);
  loading = signal<boolean>(true);
  
  private service = inject(SeasonService);

  constructor() {
    this.service.getSeasons().subscribe({
      next: (list) => this.seasons.set(list),
      error: (err) => { console.log(err)}, // ya hay catchError en el servicio
      complete: () => this.loading.set(false)
    });
  }

  onSelect(year: number): void {
    this.seasonChange.emit(year);    
  }
}

