import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../common/services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommmonService } from "../../services/common.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public myForm: FormGroup;
  constructor(
    private _apiService: CommmonService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    const auth = sessionStorage.getItem("userData");
    if (auth) {
      this._router.navigate(["/dashboard"]);
    }
    this.myForm = this._fb.group({
      email: [""],
      pwd: [""],
      // phoneNumber: [''],
    });
  }

  public ngOnInit(): void {}

  get fa() {
    return this.myForm.controls;
  }

  public login(): void {
    const { email, pwd } = this.myForm.value;
    const payload = {
      email_Id: email,
      pwd: pwd,
    };
    this._apiService.postAPI("/admin_login", payload).subscribe((res: any) => {
      if (res?.data) {
        sessionStorage.setItem("userData", JSON.stringify(res?.data?.[0]));
        this._router.navigate(["/dashboard"]);
      }
    });
  }
}
