import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { AuthService } from '../../../common/services/auth.service';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css'],
})
export class AppNavComponent implements OnInit {
  public propertyData: any[] = [];
  public options: any;
  public chart: any;

  constructor(private _apiService: CommmonService) {}

  public ngOnInit(): void {
    this._getProperty();
    this.init();
  }

  private _getProperty(): void {
    this._apiService.getAPI('property/list').subscribe((res: any) => {
      if (res.status === 200) {
        this.propertyData = res.results;

        console.log(this.propertyData);
      }
    });
  }

  init() {
    this.options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Property Analysis',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3, 4],
        },
      ],
    };
    const chart = new Chart(this.options);
    this.chart = chart;
  }
}
