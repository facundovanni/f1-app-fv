import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private http = inject(HttpClient);
  private readonly url = 'https://f1api.dev/api/seasons';

  getSeasons(): Observable<number[]> {
    // const mock = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => new Date().getFullYear() - i);
    //     return of(mock);
    return this.http.get<{ seasons: number[] }>(this.url).pipe(
      map(res => res.seasons.sort((a, b) => b - a)), // VER
      shareReplay(1)
    );
  }
}
