import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableResponse, ServerQuery } from '../models/global.model';
import { DataTableTeams, Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly baseUrl = 'https://f1api.dev/api'; // apunta a tu endpoint

  constructor(private http: HttpClient) {}

  getItems(q: ServerQuery, year: number): Observable<DataTableTeams> {
    const pageIndex = (q.page-1)* q.size;

    return this.http.get<DataTableTeams>(`${this.baseUrl}/${year}/teams?limit=${q.size}&offset=${pageIndex}`);
  }

  getItem(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`);
  }

  getDriversByTeam(id: string, year: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${year}/teams/${id}/drivers`);
  }
}
