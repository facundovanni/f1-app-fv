import { Injectable } from '@angular/core';
import { DataTableDrivers, Driver, DriverSearchParams } from '../models/driver.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataTableResponse, ServerQuery } from '../models/global.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private readonly baseUrl = 'https://f1api.dev/api';

  constructor(private http: HttpClient) { }

  private getByYear(q: ServerQuery, p?: DriverSearchParams): Observable<DataTableDrivers> {
    const offset = (q.page - 1) * q.size;
    return this.http.get<DataTableDrivers>(`${this.baseUrl}/${p?.year}/drivers?limit=${q.size}&offset=${offset}`)
      .pipe(
        map(response => {
          const filtered = p ? this.filterLocal(response.drivers, p) : response.drivers;
          response.total = response.drivers.length;
          const paged = filtered.slice(offset, offset + q.size);
          return {
            ...response,
            total: filtered.length,
            drivers: paged
          };
        })
      );
  }

  private searchQ(q: ServerQuery, p?: DriverSearchParams): Observable<DataTableDrivers> {
    const offset = (q.page - 1) * q.size;
    const qAux = p?.name || '';
    return this.http.get<any>(`${this.baseUrl}/drivers/search?limit=${q.size}&offset=${offset}&q=${qAux}`);
  }

  getItems(q: ServerQuery, p?: DriverSearchParams): Observable<DataTableDrivers> {
    if (p?.year) {
      return this.getByYear(q, p);
    }

    return this.searchQ(q, p);
  }

  private filterLocal(data: Driver[], p: DriverSearchParams): Driver[] {
    const nameSearch = p.name?.toLowerCase();
    
    return data.filter(r => {
      const okName = !nameSearch || r.name.toLowerCase().includes(nameSearch) || r.surname.toLowerCase().includes(nameSearch);
      return okName;
    });
  }
}
