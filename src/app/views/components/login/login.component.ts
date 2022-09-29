import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public myForm: FormGroup;
  constructor(
    private _apiService: CommmonService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.myForm = this._fb.group({
      email: [''],
      pwd: [''],
      // phoneNumber: [''],
    });
  }

  public ngOnInit(): void {
    console.log('datat');
  }

  get fa() {
    return this.myForm.controls;
  }

  public login(): void {
    const { email, pwd } = this.myForm.value;
    const payload = {
      email_Id: email,
      pwd: pwd,
    };
    this._apiService
      .postAPI('admin/login', payload)
      .subscribe((res: any) => {
        if (res.status == 200) {
          console.log(res);
          sessionStorage.setItem('userData', res.results);
          this._router.navigate(['/home']);
        }
      });
  }
}
