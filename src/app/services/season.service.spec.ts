// src/app/services/season.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let service: SeasonService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://f1api.dev/api/seasons?limit=100';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeasonService]
    });
    service = TestBed.inject(SeasonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch seasons and map to number array', () => {
    const mockResp = { championships: [{ year: 2025 }, { year: 2024 }, { year: 2023 }] };

    service.getSeasons().subscribe(seasons => {
      expect(seasons).toEqual([2025, 2024, 2023]);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResp);
  });
  
  it('should propagate HTTP errors', () => {
    const mockError = { status: 500, statusText: 'Server Error' };
    let errResp: any;

    service.getSeasons().subscribe({
      next: () => fail('expected an error'),
      error: err => (errResp = err)
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Internal Error', mockError);

    expect(errResp.status).toBe(500);
    expect(errResp.statusText).toBe('Server Error');
  });
});
