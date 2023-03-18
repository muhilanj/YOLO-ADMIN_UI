import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommmonService } from "../../services/common.service";
declare var $: any;

@Component({
  selector: "app-property-main",
  templateUrl: "./property-main.component.html",
  styleUrls: ["./property-main.component.css"],
})
export class PropertyMainComponent implements OnInit {

  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  isLoading: boolean = true;

  public propertyList: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
  }

  onClickAddButton() {
    // Flash the step form here as link (not dialog)
    console.log("Not implemented")
  }
}
