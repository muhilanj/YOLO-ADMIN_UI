import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommmonService } from '../../services/common.service';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  submitted=false;
  public vendorList:any;
  passwordForm = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },{
    validator: ConfirmPasswordValidator("password", "confirmPassword")
  });
  constructor(private toastrService: ToastrService,private Propertyservice: CommmonService,private _formBuilder: FormBuilder,private _router:Router,private _location: Location) { }

  ngOnInit(): void {
  }

  basicProperty() {
    this.submitted=true;
    if(this.passwordForm.valid){
      const {
        password,
        confirmPassword
      } = this.passwordForm.value;
  
      const payload = {
        password,
        user_id:2
      };
  
      console.log(payload);
      this.Propertyservice.putAPI('/update_user_password', payload).subscribe((res) => {
        if (res) {
          this.toastrService.success('Successfully reset your password');
          this.passwordForm.reset();
          //this._router.navigate(['/home']);
          this.submitted=false;
  
        }
      },(err)=>{
        this.toastrService.error('something went wrong');
      });
    }
    }
   

    onClickCancel():void{
      this._location.back();
    }
}
