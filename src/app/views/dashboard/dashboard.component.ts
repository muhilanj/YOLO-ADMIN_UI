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

  genId() {
    return Math.floor((Math.random()*6)+1);
  }
  
  onPostOrder() {
      let d = [
        {
          id: this.genId(),
          product_name: "Coke",
          ppu: 345,
          avl_stocks: 34,
          quantity: 0,
          amount: 0,
        },
        {
          id: this.genId(),
          product_name: "Pepsi",
          ppu: 456,
          avl_stocks: 56,
          quantity: 0,
          amount: 0,
        },
        {
          id: this.genId(),
          product_name: "Mirinda",
          ppu: 565,
          avl_stocks: 7845,
          quantity: 0,
          amount: 0,
        },
        {
          id: this.genId(),
          product_name: "Lemonade",
          ppu: 564,
          avl_stocks: 234,
          quantity: 0,
          amount: 0,
        },
      ];
  
      const placeOrderDialogRef = this.dialog.open(PlaceOrderDialog, {
        data: d,
        width: "1000px",
      });
  
      placeOrderDialogRef.afterClosed().subscribe((result) => {
        console.log("The Place Order dialog was closed");
      });
    
  }
}
