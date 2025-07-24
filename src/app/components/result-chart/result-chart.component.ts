import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/models/chart.model';

@Component({
  selector: 'app-result-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.scss']
})
export class ResultChartComponent  implements OnChanges {
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) fieldCategory!: string;
  @Input() fieldValue: string = 'points';
  chart: ChartOptions = {
    chart: { type: 'bar', height: 350 },
    series: [{ name: 'Puntos', data: [] }],
    xaxis: { categories: [] }
  };

  ngOnChanges(_: SimpleChanges): void {
    const categories = (this.data ?? []).map(d => d?.[this.fieldCategory] ?? '');
    const values = (this.data ?? []).map(d => Number(d?.[this.fieldValue] ?? 0));

    this.chart = {
      ...this.chart,
      series: [{ name: 'Puntos', data: values }],
      xaxis: { categories }
    };
  }
}
