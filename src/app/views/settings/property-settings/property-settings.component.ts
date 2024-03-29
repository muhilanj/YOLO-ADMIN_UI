import { Component, OnInit } from '@angular/core';
import { CommmonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-property-settings',
  templateUrl: './property-settings.component.html',
  styleUrls: ['./property-settings.component.css']
})
export class PropertySettingsComponent implements OnInit {
  removable = true;
  public properties_facilities: any = [];
  public properties_type: any = [];
  public room_type: any = [];
  
  public propertyFacility:string[] = [];
  public facility:string = '';

  public propertyType:string[] = [];
  public type:string = '';

  public availableFacility:string[] = [];
  public availFacility:string = '';
  

  constructor(
    private Propertyservice: CommmonService,
    private toastrService: ToastrService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.getPropertiesFacilities();
    this.getPropertiesType();
    this.getRoomType();
  }

  getPropertiesFacilities() {
    this.Propertyservice.getAPI("/property_facilities").subscribe((res) => {
      this.properties_facilities = res.data;
      console.log(this.properties_facilities);
      // this.isLoading = false;
    });
  }

  getPropertiesType() {
    this.Propertyservice.getAPI("/property_type").subscribe((res) => {
      this.properties_type = res.data;
      console.log(this.properties_type);
      // this.isLoading = false;
    });
  }
  getRoomType(){
    this.Propertyservice.getAPI("/room_facilities").subscribe((res) => {
      this.room_type = res.data;
      console.log(this.room_type);
      // this.isLoading = false;
    });
  }

  remove(property: string): void {
    const index = this.room_type.indexOf(property);

    if (index >= 0) {
      this.room_type.splice(index, 1);
    }
  }
  remove_property_type(type: string): void {
    const index = this.properties_type.indexOf(type);

    if (index >= 0) {
      this.properties_type.splice(index, 1);
    }
  }

  remove_property_facility(facility: string): void {
    const index = this.properties_facilities.indexOf(facility);

    if (index >= 0) {
      this.properties_facilities.splice(index, 1);
    }
  }

  addPropertyFacility(){
    if(this.facility!==''){
      const payload={
        facility_name:this.facility,
        user_id:2
      }
      this.Propertyservice.postAPI('/add_property_facilities', payload).subscribe((res) => {
        if (res) {          
          this.getPropertiesFacilities();
          this.toastrService.success('Success');
          this.facility='';
        }
      },(err)=>{
        this.toastrService.error('something went wrong');
      });
    }
  }

  removePropertyFacility(data:string){
    
    const index = this.propertyFacility.indexOf(data);
    this.propertyFacility.splice(index, 1);
  }

  addPropertyType(){
    if(this.type!==''){
      const payload={
        category:this.type,
        user_id:2
      }
      this.Propertyservice.postAPI('/add_property_category', payload).subscribe((res) => {
        if (res) {
          this.toastrService.success('Success');
          this.type='';
        }
      },(err)=>{
        this.toastrService.error('something went wrong');
      });
    }
  }

  removePropertyType(data:string){
    
    const index = this.propertyType.indexOf(data);
    this.propertyType.splice(index, 1);
  }

  addAvailableFacility(){
    if(this.availFacility!==''){
      const payload={
        facility_name:this.availFacility,
        user_id:2
      }
      this.Propertyservice.postAPI('/add_room_facility', payload).subscribe((res) => {
        if (res) {
          this.toastrService.success('Success');
          this.availFacility='';
        }
      },(err)=>{
        this.toastrService.error('something went wrong');
      });
    }
  }

  removeAvailableacility(data:string){
    
    const index = this.availableFacility.indexOf(data);
    this.availableFacility.splice(index, 1);
  }

  //api calls starts here
  submitPropertyFacility(payload:any){
    console.log(payload);
    this.Propertyservice.postAPI('/add_basic_property', payload).subscribe((res) => {
      if (res.status === 200) {
        alert('success')
      }
    });
  }

    
    submitPropertyType(payload:any){
      console.log(payload);
      this.Propertyservice.postAPI('/add_basic_property', payload).subscribe((res) => {
        if (res.status === 200) {
          alert('success')
        }
      });
    }

  submitPropertyAvailableFacility(payload:any){
    console.log(payload);
    this.Propertyservice.postAPI('/add_basic_property', payload).subscribe((res) => {
      if (res.status === 200) {
        alert('success')
      }
    });
  }
}
