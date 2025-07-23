import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let service: SeasonService;
  let httpMock: HttpTestingController;

  const URL = 'https://f1api.dev/api/seasons';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeasonService]
    });

    service = TestBed.inject(SeasonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería pedir las seasons y ordenarlas desc', () => {
    const payload = { seasons: [1991, 2024, 2000] };
    let result: number[] | undefined;

    service.getSeasons().subscribe(r => (result = r));

    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(payload);

    expect(result).toEqual([2024, 2000, 1991]);
  });

  it('debería cachear (shareReplay): misma instancia, 1 sola request', () => {
    const payload = { seasons: [2022, 2023] };
    const results: number[][] = [];

    service.getSeasons().subscribe(r => results.push(r));
    service.getSeasons().subscribe(r => results.push(r)); // 2da sub

    const req = httpMock.expectOne(URL);
    req.flush(payload);

    expect(results.length).toBe(2);
    expect(results[0]).toEqual([2023, 2022]);
    expect(results[1]).toEqual([2023, 2022]);

    // No más requests
    httpMock.expectNone(URL);
  });

  it('debería propagar error (sin catchError)', () => {
    const errorMsg = 'Network down';
    let error: any;

    service.getSeasons().subscribe({
      next: () => fail('Debería fallar'),
      error: (e) => (error = e)
    });

    const req = httpMock.expectOne(URL);
    req.flush(errorMsg, { status: 500, statusText: 'Server Error' });

    expect(error.status).toBe(500);
    expect(error.error).toBe(errorMsg);
  });
});
