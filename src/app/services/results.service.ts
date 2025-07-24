import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { DriverChampionshipStanding } from '../models/driver.model';
import { TeamChampionshipStanding } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private http = inject(HttpClient);
  private base = 'https://f1api.dev/api';

  getPilotStandings(season: number): Observable<any[]> {
    return this.http.get<{drivers_championship: DriverChampionshipStanding[]}>(`${this.base}/${season}/drivers-championship`)
      .pipe(map(res => res.drivers_championship.map(c => ({...c, driverName: c.driver?.surname})).slice(0, 5)));
  }

  getConstructorStandings(season: number): Observable<any[]> {
    return this.http.get<{constructors_championship: TeamChampionshipStanding[]}>(`${this.base}/${season}/constructors-championship`)
      .pipe(map(res => res.constructors_championship.map(c => ({...c, teamName: c.team?.teamName})).slice(0, 5)));
  }
}
