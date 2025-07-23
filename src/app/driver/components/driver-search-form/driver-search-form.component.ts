import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverSearchParams } from 'src/app/models/driver.model';

@Component({
  selector: 'app-driver-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-search-form.component.html',
  styleUrls: ['./driver-search-form.component.scss']
})
export class DriverSearchFormComponent {
  @Output() searchData = new EventEmitter<DriverSearchParams>();
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    year: [null as number | null],
    name: [''],
    surname: ['']
  });


  search(): void {
    const { year, name, surname } = this.form.getRawValue();

    const data: DriverSearchParams = {
      ...(year ? { year: +year } : {}),
      ...(name?.trim().length >= 4 ? { name: name.trim() } : {}),
    };

    this.searchData.emit(data);
  }
}
