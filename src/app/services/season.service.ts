import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private http = inject(HttpClient);
  private readonly url = 'https://f1api.dev/api';

  getSeasons(): Observable<number[]> {
    return this.http.get<{ championships: [{ year: number }] }>(`${this.url}/seasons?limit=100`).pipe(
      map(res =>
        res.championships.map(
          data => data.year)),
      shareReplay(1)
    );
  }
}
