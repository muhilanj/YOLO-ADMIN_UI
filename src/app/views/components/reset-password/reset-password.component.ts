import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommmonService } from '../../services/common.service';
import { ConfirmPasswordValidator } from './confirm-password-validator';

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
  constructor(private Propertyservice: CommmonService,private _formBuilder: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
  }

  basicProperty() {
    this.submitted=true;
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
        this._router.navigate(['/home']);
     
        // this.propertyDetailsData = res.data;

      }
    });
  }

}
