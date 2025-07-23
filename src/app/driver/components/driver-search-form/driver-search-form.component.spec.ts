import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSearchFormComponent } from './driver-search-form.component';

describe('DriverSearchFormComponent', () => {
  let component: DriverSearchFormComponent;
  let fixture: ComponentFixture<DriverSearchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DriverSearchFormComponent]
    });
    fixture = TestBed.createComponent(DriverSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
