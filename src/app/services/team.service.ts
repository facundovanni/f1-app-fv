import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableResponse } from '../models/global.model';
import { DataTableTeams, Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly baseUrl = 'https://f1api.dev/api'; // apunta a tu endpoint

  constructor(private http: HttpClient) {}

  getItems(year: number): Observable<DataTableTeams> {
    return this.http.get<DataTableTeams>(`${this.baseUrl}/${year}/teams?limit=30`);
  }

  getItem(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`);
  }

  getDriversByTeam(id: string, year: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${year}/teams/${id}/drivers`);
  }
}
