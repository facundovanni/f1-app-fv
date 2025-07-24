import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonSelectComponent } from './season-select.component';
import { SeasonService } from 'src/app/services/season.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

class SeasonServiceMock {
  getSeasons = jasmine.createSpy().and.returnValue(of([2024, 2023, 2022]));
}

describe('SeasonSelectComponent', () => {
  let fixture: ComponentFixture<SeasonSelectComponent>;
  let component: SeasonSelectComponent;
  let service: SeasonServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonSelectComponent],
      providers: [{ provide: SeasonService, useClass: SeasonServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonSelectComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SeasonService) as unknown as SeasonServiceMock;
  });

  it('debería crearse y cargar seasons', () => {
    fixture.detectChanges(); // Ejecuta constructor -> suscripción

    expect(component).toBeTruthy();
    expect(service.getSeasons).toHaveBeenCalled();
    expect(component.seasons()).toEqual([2024, 2023, 2022]);
    expect(component.loading()).toBeFalse();
  });

  it('debería emitir seasonChange al seleccionar un año', () => {
    spyOn(component.seasonChange, 'emit');

    fixture.detectChanges();

    component.onSelect(2024);

    expect(component.seasonChange.emit).toHaveBeenCalledWith(2024);
  });

  it('debería manejar error del servicio y dejar loading en false', () => {
    service.getSeasons.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log'); // se usa console.log en el catch

    fixture.detectChanges();

    expect(component.loading()).toBeFalse();
    expect(component.seasons()).toEqual([]);
    expect(console.log).toHaveBeenCalled();
  });

  it('debería reflejar el @Input value en el template', () => {
    component.value = 2023;
    fixture.detectChanges();

    const selectDebug = fixture.debugElement.query(By.css('nz-select'));
    expect(selectDebug.attributes['ng-reflect-ng-model']).toBe('2023');

    expect(component.value).toBe(2023);
  });

  it('debería aplicar disabled y width', () => {
    component.disabled = true;
    component.width = '250px';
    fixture.detectChanges();

    const selectEl = fixture.debugElement.query(By.css('nz-select'));
    expect(selectEl.attributes['ng-reflect-nz-disabled']).toBe('true');
    const host = selectEl.nativeElement as HTMLElement;
    expect(host.style.width || host.getAttribute('style')).toContain('250px');
  });
});
