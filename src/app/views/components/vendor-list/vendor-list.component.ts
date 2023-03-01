import { Component, OnInit } from '@angular/core';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  public vendorList:any;

  constructor(private Propertyservice: CommmonService) { }

  ngOnInit(): void {
    this.getVendor();
  }

  getVendor() {
    this.Propertyservice.getAPI('/get_user_details').subscribe((res) => {
      this.vendorList = res.data;
    });
  }

}
