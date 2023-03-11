import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
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
    this.Propertyservice.getAPI('/get_user_list').subscribe((res) => {
      this.vendorList = res.data;
    });
  }

}
