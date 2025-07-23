import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { DataTableResponse } from '../models/global.model';
import { DataTableTeams, Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly baseUrl = 'https://f1api.dev/api'; // apunta a tu endpoint

  MOCK_TEAMS_BY_YEAR: Record<number | 'default', Team[]> = {
    2024: [
      {
        teamId: 'redbull',
        teamName: 'Red Bull Racing',
        teamNationality: 'Austrian',
        firstAppeareance: 2005,
        constructorsChampionships: 6,
        driversChampionships: 7,
        url: 'https://www.redbullracing.com'
      },
      {
        teamId: 'mercedes',
        teamName: 'Mercedes',
        teamNationality: 'German',
        firstAppeareance: 1954,
        constructorsChampionships: 8,
        driversChampionships: 9,
        url: 'https://www.mercedesamgf1.com'
      },
      {
        teamId: 'ferrari',
        teamName: 'Ferrari',
        teamNationality: 'Italian',
        firstAppeareance: 1950,
        constructorsChampionships: 16,
        driversChampionships: 15,
        url: 'https://www.ferrari.com'
      },
      {
        teamId: 'mclaren',
        teamName: 'McLaren',
        teamNationality: 'British',
        firstAppeareance: 1966,
        constructorsChampionships: 8,
        driversChampionships: 12,
        url: 'https://www.mclaren.com'
      },
      {
        teamId: 'aston',
        teamName: 'Aston Martin',
        teamNationality: 'British',
        firstAppeareance: 1959,
        constructorsChampionships: 0,
        driversChampionships: 0,
        url: 'https://www.astonmartinf1.com'
      }
    ],
    default: []
  };

  constructor(private http: HttpClient) {}

  getItems(year: number): Observable<DataTableTeams> {
    const teams = this.MOCK_TEAMS_BY_YEAR[year] ?? [];
    return of({
      api: 'mock',
      url: `/api/${year}/teams?limit=${30}`,
      limit: 30,
      offset: 0,
      total: teams.length,
      teams
    }).pipe(delay(400)); // simula latencia
    return this.http.get<DataTableTeams>(`${this.baseUrl}/${year}/teams?limit=30`);
  }

  getItem(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`);
  }

  getDriversByTeam(id: string, year: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${year}/teams/${id}/drivers`);
  }

  
}