import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultChartComponent } from './result-chart.component';

describe('ResultChartComponent', () => {
  let component: ResultChartComponent;
  let fixture: ComponentFixture<ResultChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResultChartComponent]
    });
    fixture = TestBed.createComponent(ResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(component: ResultChartComponent) {
  throw new Error('Function not implemented.');
}

