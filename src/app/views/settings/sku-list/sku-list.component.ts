import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommmonService } from "../../services/common.service";
declare var $: any;

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  styleUrls: ['./sku-list.component.css']
})
export class SkuListComponent implements OnInit {

  cars: any[] = [];
  searchText: string = "";
  response: string = "";
  roleData: any;
  p: any;
  isLoading: boolean = false;

  public SkuList: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router
  ) {}

  getSkuList() {
    this.Propertyservice.getAPI("/sku").subscribe((res) => {
      this.SkuList = res.data;
      console.log(this.SkuList);
      this.isLoading = false;
    });
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.getSkuList();
  }
  onClickAddButton() {
    // Flash the step form here as link (not dialog)
    console.log("Not implemented");
    this._router.navigate(["/add-sku"]);
  }

}
