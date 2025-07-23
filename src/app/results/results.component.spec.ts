import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ResultsComponent } from './results.component';
import { ResultsService } from '../services/results.service';

// Mocks simples
const pilotsMock = [{ driverId: 'max', points: 400 }];
const constructorsMock = [{ constructorId: 'rb', points: 700 }];

describe('ResultsComponent', () => {
  let fixture: ComponentFixture<ResultsComponent>;
  let component: ResultsComponent;
  let serviceSpy: jasmine.SpyObj<ResultsService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ResultsService', [
      'getPilotStandings',
      'getConstructorStandings'
    ]);

    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        { provide: ResultsService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    // Arrange
    serviceSpy.getPilotStandings.and.returnValue(of(pilotsMock));
    serviceSpy.getConstructorStandings.and.returnValue(of(constructorsMock));

    // Act
    fixture.detectChanges(); // dispara constructor -> loadData

    // Assert
    expect(component).toBeTruthy();
  });

  it('debería cargar datos en el init (loadData) y setear signals', () => {
    serviceSpy.getPilotStandings.and.returnValue(of(pilotsMock));
    serviceSpy.getConstructorStandings.and.returnValue(of(constructorsMock));

    fixture.detectChanges();

    expect(serviceSpy.getPilotStandings).toHaveBeenCalledWith(component.selectedSeason());
    expect(serviceSpy.getConstructorStandings).toHaveBeenCalledWith(component.selectedSeason());

    expect(component.pilotStandings()).toEqual(pilotsMock);
    expect(component.constructorStandings()).toEqual(constructorsMock);
    expect(component.isLoading()).toBeFalse();
  });

  it('debería manejar error y dejar isLoading en false', () => {
    serviceSpy.getPilotStandings.and.returnValue(throwError(() => new Error('fail pilots')));
    serviceSpy.getConstructorStandings.and.returnValue(of(constructorsMock));

    fixture.detectChanges();

    expect(component.isLoading()).toBeFalse();
    // pilotos queda vacío
    expect(component.pilotStandings()).toEqual([]);
    // constructores se setea igual (forkJoin aborta al primer error, pero si adaptaste la lógica puede cambiar)
    // En tu implementación actual, forkJoin no emite nada si hay error, así que chequeamos el default
    expect(component.constructorStandings()).toEqual([]);
  });

  it('onSeasonChange debería actualizar selectedSeason y volver a llamar loadData', () => {
    serviceSpy.getPilotStandings.and.returnValues(of(pilotsMock), of([{ driverId: 'checo', points: 300 }]));
    serviceSpy.getConstructorStandings.and.returnValues(of(constructorsMock), of([{ constructorId: 'mer', points: 500 }]));

    fixture.detectChanges(); // primera carga

    component.onSeasonChange(2010);

    expect(component.selectedSeason()).toBe(2010);
    expect(serviceSpy.getPilotStandings).toHaveBeenCalledWith(2010);
    expect(serviceSpy.getConstructorStandings).toHaveBeenCalledWith(2010);

    expect(component.pilotStandings()).toEqual([{ driverId: 'checo', points: 300 }]);
    expect(component.constructorStandings()).toEqual([{ constructorId: 'mer', points: 500 }]);
    expect(component.isLoading()).toBeFalse();
  });
});
