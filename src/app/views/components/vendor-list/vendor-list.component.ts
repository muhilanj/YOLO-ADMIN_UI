import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  response:string='';
  roleData:any;
  p:any;
  
  public vendorList:any;
 
  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getVendor();
  }

  getVendor() {
    this.Propertyservice.getAPI('/get_vendor_list').subscribe((res) => {
      this.vendorList = res.data;
    });
  }

}
