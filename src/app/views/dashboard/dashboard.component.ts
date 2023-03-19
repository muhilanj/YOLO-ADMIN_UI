import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderDialog } from '../components/vendor-list/vendor-list.component';
import { CommmonService } from '../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true;

  constructor(public ApiService: CommmonService,
    public dialog: MatDialog) { }

  dashboardData: any;
  ngOnInit(): void {
    this.getAdminPanelData();
  }

  getAdminPanelData() {
    this.ApiService.getAPI('/get_admin_dashboard').subscribe((res) => {
      this.dashboardData = res.data[0];
      this.isLoading = false;
    });
  }
}
