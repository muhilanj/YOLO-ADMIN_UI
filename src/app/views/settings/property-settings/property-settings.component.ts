import { Component, OnInit } from '@angular/core';
import { CommmonService } from '../../services/common.service';
import { Router } from '@angular/router';

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
    private _router:Router
  ) {}

  ngOnInit(): void {
  }

  addPropertyFacility(data:string){
    if(data){
      this.propertyFacility.push(data);
      this.facility = '';
    }
  }

  removePropertyFacility(data:string){
    
    const index = this.propertyFacility.indexOf(data);
    this.propertyFacility.splice(index, 1);
  }

  addPropertyType(data:string){
    if(data){
      this.propertyType.push(data);
      this.type = '';
    }
  }

  removePropertyType(data:string){
    
    const index = this.propertyType.indexOf(data);
    this.propertyType.splice(index, 1);
  }

  addAvailableFacility(data:string){
    if(data){
      this.availableFacility.push(data);
      this.availFacility = '';
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
