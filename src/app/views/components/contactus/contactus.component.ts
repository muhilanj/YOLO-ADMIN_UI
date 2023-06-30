import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommmonService } from "../../services/common.service";import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
declare var $: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  isLoading: boolean = false;

  public contactusList: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  getContactusList() {
    this.Propertyservice.getAPI("/contact_us_details").subscribe((res) => {
      this.contactusList = res.data;
      console.log(this.contactusList);
      this.isLoading = false;
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ContactDialog, {
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
    this.getContactusList();
  }
  // onClickAddButton() {
  //   // Flash the step form here as link (not dialog)
  //   console.log("Not implemented");
  //   this._router.navigate(["/basicproperty"]);
  // }

}
@Component({
  selector: "contact-dialog",
  templateUrl: "contact-dialog.html",
  styleUrls: ["./contact-list-dialog.component.css"],
})
export class ContactDialog {
  constructor(
    public dialogRef: MatDialogRef<ContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}