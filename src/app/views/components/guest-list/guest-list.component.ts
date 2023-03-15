import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CommmonService } from "../../services/common.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "app-guest-list",
  templateUrl: "./guest-list.component.html",
  styleUrls: ["./guest-list.component.css"],
})
export class GuestListComponent implements OnInit {

  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  loader: boolean = true;

  public vendorList: any;
  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(GuestDialog, {
      data,
      width: "1000px",
      // height: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit(): void {
    this.loader = true;
    this.getVendor();
  }

  getVendor() {
    this.Propertyservice.getAPI("/get_user_list").subscribe((res) => {
      this.vendorList = res.data;
      this.loader = false;
    });
  }
}

@Component({
  selector: "guest-dialog",
  templateUrl: "guest-dialog.html",
  styleUrls: ["./guest-list-dialog.component.css"],
})
export class GuestDialog {
  constructor(
    public dialogRef: MatDialogRef<GuestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}