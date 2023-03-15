import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CommmonService } from "../../services/common.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.css"],
})
export class VendorListComponent implements OnInit {
  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  isLoading: boolean = true;

  public vendorList: any;

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(VendorDialog, {
      data,
      width: "1000px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openPlaceOrderDialog(data: any): void {
    let d = [
      {
        product_name: "Coke",
        ppu: 1000,
        avl_stocks: 1000,
        quantity: 4,
        amount: 4000,
      },
      {
        product_name: "Pepsi",
        ppu: 1000,
        avl_stocks: 1000,
        quantity: 4,
        amount: 4000,
      },
      {
        product_name: "Mirinda",
        ppu: 1000,
        avl_stocks: 1000,
        quantity: 4,
        amount: 4000,
      },
      {
        product_name: "Lemonade",
        ppu: 1000,
        avl_stocks: 1000,
        quantity: 4,
        amount: 4000,
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

  ngOnInit(): void {
    this.isLoading = true;
    this.getVendor();
  }

  getVendor() {
    this.Propertyservice.getAPI("/get_vendor_list").subscribe((res) => {
      this.vendorList = res.data;
      this.isLoading = false;
    });
  }
}

@Component({
  selector: "vendor-dialog",
  templateUrl: "./vendor-dialog.html",
  styleUrls: ["./vendor-dialog.component.css"],
})
export class VendorDialog {
  constructor(
    public dialogRef: MatDialogRef<VendorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "place-order-dialog",
  templateUrl: "./place-order-dialog.html",
  styleUrls: ["./place-order-dialog.css"],
})
export class PlaceOrderDialog {
  constructor(
    public dialogRef: MatDialogRef<VendorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  p: any;

  onUpdateData(item: any) {
    // Two way binding between Dialog and component
  }

  getTotal() {
    return 16000;
  }

  onPlaceOrder() {
    this.dialogRef.close();
    alert("Order Placed");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
