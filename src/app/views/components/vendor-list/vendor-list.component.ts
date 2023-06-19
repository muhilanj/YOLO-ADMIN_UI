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
import { HttpParams } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

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

  vendor_id = 1;
  user_id = 1;

  public vendorList: any;
  public vendorProducts: any;

  constructor(
    private _formBuilder: FormBuilder,
    private toastrService: ToastrService,
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

    let productList = this.vendorProducts.map((product: any) => {
      return {
        ...product,
        quantity: 0,
        amount: 0
      }
    })

    const placeOrderDialogRef = this.dialog.open(PlaceOrderDialog, {
      data: productList,
      width: "1000px",
    });
    console.log(productList);
    placeOrderDialogRef.componentInstance.onOrderPlaced.subscribe((productsOrdered: any) => {
      let payload = {
        vendor_id: this.vendor_id, 
        user_id: this.user_id,
        products: productsOrdered.map((product:any) => {
          return {
            Price_Per_Unit: product.price,
            Quantity: product.quantity,
            Product_ID: product.Product_ID
          }
        })
      }
      
      this.Propertyservice.postAPI('/add_order', payload).subscribe((res) => {
        console.log(res);
        this.toastrService.success("Order Successful");
      })
    })

    placeOrderDialogRef.afterClosed().subscribe((result) => {
      console.log("The Place Order dialog was closed");
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getVendor();
    this.getVedorProducts();
  }

  getVendor() {
    this.Propertyservice.getAPI("/get_vendor_list").subscribe((res) => {
      this.vendorList = res.data;
      console.log({
        vendor: res.data
      })
      this.isLoading = false;
    });
  }

  getVedorProducts() {
    let params = new HttpParams();
    params = params.append("vendor_id", this.vendor_id);
    this.Propertyservice.getAPIWithParams("/vendor_products", params).subscribe((res) => {
      this.vendorProducts = res.data;
      console.log(this.vendorProducts);
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

  onOrderPlaced = new EventEmitter();

  getTotal() {
    return this.data.map((d: any) => (d.quantity * d.price)).reduce((a: any,b: any) => a + b,0);
  }

  onUpdateQuantity(value: any, item: any) {
    if (value > item.Available_Stock) {
      console.log(value)
      item.quantity = item.Available_Stock + "";
    }

    this.products = this.products.map((product: any) => (item.Product_ID === product.Product_ID ? { ...product, quantity: value } : product))
  }

  onSearchProducts(event: any) {
    this.currProducts = this.products.filter((product: any) => event.length > 0 ? product.product_name.toLowerCase().includes(event.toLowerCase()) : true);
  }

  onPlaceOrder() {
    let orderProducts = this.products.filter((product: any) => product.quantity > 0);
    this.onOrderPlaced.emit(orderProducts);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
