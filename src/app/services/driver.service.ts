import { Injectable } from '@angular/core';
import { DataTableDrivers } from '../models/driver.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private readonly baseUrl = 'https://f1api.dev/api';
  
  constructor(private http: HttpClient) {}

  getItems(year: number): Observable<DataTableDrivers> {
    return this.http.get<DataTableDrivers>(`${this.baseUrl}/${year}/teams?limit=30`);
  }
}
