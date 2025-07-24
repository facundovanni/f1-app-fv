import { TestBed } from '@angular/core/testing';
import { ResultsService } from './results.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResultsComponent } from '../results/results.component';

describe('ResultsService', () => {
  let service: ResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ResultsComponent,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ResultsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
