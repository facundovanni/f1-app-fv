import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ResultChartComponent } from './result-chart.component';

describe('ResultChartComponent', () => {
  let component: ResultChartComponent;
  let fixture: ComponentFixture<ResultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule, ResultChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart with empty data by default', () => {
    expect(component.chart.series[0].data).toEqual([]);
    expect(component.chart.xaxis.categories).toEqual([]);
  });

  describe('ngOnChanges', () => {
    it('should update categories and data according to inputs', () => {
      const testData = [
        { name: 'Perez', points: 150 },
        { name: 'Verstappen', points: 395 },
        { name: 'Hamilton', points: 275 }
      ];

      component.fieldCategory = 'name';
      component.fieldValue = 'points';
      component.data = testData;

      component.ngOnChanges({
        data: new SimpleChange(null, testData, true),
        fieldCategory: new SimpleChange(null, 'name', true),
        fieldValue: new SimpleChange(null, 'points', true)
      });

      expect(component.chart.xaxis.categories).toEqual(['Perez', 'Verstappen', 'Hamilton']);
      expect(component.chart.series[0].data).toEqual([150, 395, 275]);
    });

    it('should coerce missing or non-numeric values to defaults', () => {
      const testData = [
        { foo: 'A', bar: 'NaN' },
        { foo: 'B' } // missing bar
      ];

      component.fieldCategory = 'foo';
      component.fieldValue = 'bar';
      component.data = testData;

      component.ngOnChanges({ data: new SimpleChange(null, testData, true) });

      expect(component.chart.xaxis.categories).toEqual(['A', 'B']);
      expect(component.chart.series[0].data).toEqual([0, 0]);
    });

    it('should preserve other chart options when updating', () => {
      component.chart = {
        ...component.chart,
        chart: { type: 'line', height: 200 },
        series: [{ name: 'Custom', data: [1] }],
        xaxis: { categories: ['Z'] }
      };

      const testData = [{ x: 'X', y: 10 }];
      component.fieldCategory = 'x';
      component.fieldValue = 'y';
      component.data = testData;

      component.ngOnChanges({ data: new SimpleChange(null, testData, true) });

      expect(component.chart.chart.type).toBe('line');
      expect(component.chart.chart.height).toBe(200);
      expect(component.chart.xaxis.categories).toEqual(['X']);
      expect(component.chart.series[0].data).toEqual([10]);
    });
  });
});
