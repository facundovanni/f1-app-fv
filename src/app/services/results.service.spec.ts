import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsService } from './results.service';

describe('ResultsService', () => {
  let service: ResultsService;
  let httpMock: HttpTestingController;

  const base = 'https://f1api.dev/api/es';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultsService]
    });
    service = TestBed.inject(ResultsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getPilotStandings debe pedir el endpoint y devolver top 5', () => {
    const season = 2024;
    const payload = {
      standings: [
        { driverName: 'A', points: 1 },
        { driverName: 'B', points: 2 },
        { driverName: 'C', points: 3 },
        { driverName: 'D', points: 4 },
        { driverName: 'E', points: 5 },
        { driverName: 'F', points: 6 }
      ]
    };

    let result: any[] | undefined;
    service.getPilotStandings(season).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${base}/${season}/drivers/standings`);
    expect(req.request.method).toBe('GET');
    req.flush(payload);

    expect(result).toEqual(payload.standings.slice(0, 5));
  });

  it('getConstructorStandings debe pedir el endpoint y devolver top 5', () => {
    const season = 2023;
    const payload = {
      standings: [
        { constructorName: 'X', points: 700 },
        { constructorName: 'Y', points: 600 },
        { constructorName: 'Z', points: 500 },
        { constructorName: 'W', points: 400 },
        { constructorName: 'V', points: 300 },
        { constructorName: 'U', points: 200 }
      ]
    };

    let result: any[] | undefined;
    service.getConstructorStandings(season).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${base}/${season}/constructors/standings`);
    expect(req.request.method).toBe('GET');
    req.flush(payload);

    expect(result).toEqual(payload.standings.slice(0, 5));
  });

  it('propaga error del backend', () => {
    const season = 2022;
    const msg = 'Server down';
    let errorResp: any;

    service.getPilotStandings(season).subscribe({
      next: () => fail('debería fallar'),
      error: e => (errorResp = e)
    });

    const req = httpMock.expectOne(`${base}/${season}/drivers/standings`);
    req.flush(msg, { status: 500, statusText: 'Server Error' });

    expect(errorResp.status).toBe(500);
    expect(errorResp.error).toBe(msg);
  });
});
