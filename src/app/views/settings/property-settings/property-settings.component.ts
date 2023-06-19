import { Component, OnInit } from '@angular/core';
import { CommmonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-settings',
  templateUrl: './property-settings.component.html',
  styleUrls: ['./property-settings.component.css']
})
export class PropertySettingsComponent implements OnInit {

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
  }

  addPropertyFacility(){
    if(this.facility!==''){
      const payload={
        facility_name:this.facility,
        user_id:2
      }
      this.Propertyservice.postAPI('/add_property_facilities', payload).subscribe((res) => {
        if (res) {
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
