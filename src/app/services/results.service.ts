import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private http = inject(HttpClient);
  private base = 'https://f1api.dev/api/es';

  getPilotStandings(season: number): Observable<any[]> {
    const mock = [
      { driverName: 'Max Verstappen', points: 420 },
      { driverName: 'Lewis Hamilton', points: 390 },
      { driverName: 'Charles Leclerc', points: 340 },
      { driverName: 'Fernando Alonso', points: 290 },
      { driverName: 'Carlos Sainz', points: 250 }
    ];

    // Simula una demora de 500ms
    return of(mock).pipe(delay(500));
    return this.http.get<any>(`${this.base}/${season}/drivers/standings`)
      .pipe(map(res => res.standings.slice(0, 5)));
  }

  getConstructorStandings(season: number): Observable<any[]> {
    const mock = [
      { constructorName: 'Red Bull Racing', points: 720 },
      { constructorName: 'Mercedes', points: 690 },
      { constructorName: 'Ferrari', points: 610 },
      { constructorName: 'Aston Martin', points: 570 },
      { constructorName: 'McLaren', points: 500 }
    ];

    return of(mock).pipe(delay(500));
    return this.http.get<any>(`${this.base}/${season}/constructors/standings`)
      .pipe(map(res => res.standings.slice(0, 5)));
  }
}
