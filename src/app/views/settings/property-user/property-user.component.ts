import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.css']
})
export class PropertyUserComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  response:string='';
  roleData:any;
  public vendorList:any;
  userForm = this._formBuilder.group({
    user_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    report_to: [],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getVendor();
    this.getUser()
  }

  getVendor() {
    this.Propertyservice.getAPI('/get_user_details').subscribe((res) => {
      this.vendorList = res.data;
    });
  }
  getUser() {
    this.Propertyservice.getAPI('/get_roles').subscribe((res) => {
      console.log(res.data)
      this.roleData = res.data;
    });
  }

  addUser():void{
    if(this.userForm.valid){
      const {user_name,email,password,phone,role,report_to}=this.userForm.value;
      const payload={
        user_name,email,password,phone,role,report_to,
        user_id:2
      }
  
        this.Propertyservice.postAPI('/add_user',payload).subscribe((res) => {
          console.log({res})
          this.response = res.data;
        });
    }
   
  
  }


}
