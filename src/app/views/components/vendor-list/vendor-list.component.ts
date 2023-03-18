import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CommmonService } from "../../services/common.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { EventEmitter } from "@angular/core";

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

  genId() {
    return Math.floor((Math.random()*6)+1);
  }

  openPlaceOrderDialog(data: any): void {
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
  ) {
    this.products = [...data];
    this.currProducts = this.products.map((d: any) => d);
  }
  products: any;
  currProducts: any;
  searchedValue: any;
  p: any;

  getTotal() {
    return this.data.map((d: any) => (d.quantity * d.ppu)).reduce((a: any,b: any) => a + b,0);
  }

  onUpdateQuantity(value: any, item: any) {
    console.log(value)
    if (value > item.avl_stocks) {
      item.quantity = item.avl_stocks;
    }

    this.products = this.products.map((product: any) => (item.id === product.id ? { ...product, quantity: value } : product))
  }

  onSearchProducts(event: any) {
    this.currProducts = this.products.filter((product: any) => event.length > 0 ? product.product_name.toLowerCase().includes(event.toLowerCase()) : true);
  }

  onPlaceOrder() {
    let totolAmount = this.getTotal();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
