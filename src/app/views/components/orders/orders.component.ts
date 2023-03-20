import { Component, OnInit } from "@angular/core";
import { CommmonService } from "../../services/common.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  loader: boolean = true;
  public orderList: any;
  p: any;
  searchText: string = "";

  constructor(private Propertyservice: CommmonService) {}

  ngOnInit(): void {
    this.loader = true;
    this.getOrders();
  }

  getOrders() {
    this.Propertyservice.getAPI("/get_orders").subscribe((res) => {
      this.orderList = res.data;
      this.loader = false;
    });
  }
}
