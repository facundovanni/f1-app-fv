import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { SeasonSelectComponent } from 'src/app/components/season-select/season-select.component';
import { DriverSearchParams } from 'src/app/models/driver.model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-driver-search',
  standalone: true,
  imports: [CommonModule, SeasonSelectComponent, NzInputModule, NzButtonModule, NzIconModule, NzFormModule],
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent {
  @Output() searchData = new EventEmitter<DriverSearchParams>();
  private noti = inject(NzNotificationService);
  year = signal<number>(0);
  name = signal<string>('');

  search() {
    const data: DriverSearchParams = {
      year: this.year(),
      name: this.name()?.trim().length >= 4 ? this.name() : ''
    }
    this.searchData.emit(data);
  }

  onSearchYear(year: number) {
    this.year.set(year);
    this.search();
  }

  onSearchName(name: any) {
    if (name.length > 3 || name.length === 0) {
      this.name.set(name);
      this.search();
    } else {
      this.noti.warning('Búsqueda', 'A partir de 4 caractéres');
    }
  }

  onChange(year: number) {
    this.year.set(year);
    this.search();
  }
}
