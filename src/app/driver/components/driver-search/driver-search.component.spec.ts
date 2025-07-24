import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverSearchComponent } from './driver-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SeasonService } from 'src/app/services/season.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('DriverSearchComponent', () => {
  let component: DriverSearchComponent;
  let fixture: ComponentFixture<DriverSearchComponent>;
  let seasonServiceSpy: jasmine.SpyObj<SeasonService>;
  let notiSpy: jasmine.SpyObj<NzNotificationService>;
  beforeEach(() => {
    seasonServiceSpy = jasmine.createSpyObj('SeasonService', ['getSeasons']);
    notiSpy = jasmine.createSpyObj('NzNotificationService', ['error']);
    seasonServiceSpy.getSeasons.and.returnValue(of([]));
    
    TestBed.configureTestingModule({
      imports: [DriverSearchComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SeasonService, useValue: seasonServiceSpy },
        { provide: NzNotificationService, useValue: notiSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DriverSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
