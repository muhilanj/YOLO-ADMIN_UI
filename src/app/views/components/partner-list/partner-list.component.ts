import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommmonService } from "../../services/common.service";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
declare var $: any;


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {

  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  isLoading: boolean = false;

  public partnerList: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  getPartnerList() {
    this.Propertyservice.getAPI("/partner_list").subscribe((res) => {
      this.partnerList = res.data;
      console.log(this.partnerList);
      this.isLoading = false;
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(PartnerDialog, {
      data,
      width: "1000px",
      // height: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.getPartnerList();
  }
  // onClickAddButton() {
  //   // Flash the step form here as link (not dialog)
  //   console.log("Not implemented");
  //   this._router.navigate(["/basicproperty"]);
  // }

}
@Component({
  selector: "partner-dialog",
  templateUrl: "partner-dialog.html",
  styleUrls: ["./partner-list-dialog.component.css"],
})
export class PartnerDialog {
  constructor(
    public dialogRef: MatDialogRef<PartnerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
