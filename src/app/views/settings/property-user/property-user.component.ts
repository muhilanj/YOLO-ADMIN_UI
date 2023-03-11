import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommmonService } from '../../services/common.service';
declare var $:any;
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
  p:any;
  submitted:boolean=false;
  
  public vendorList:any;
  userForm = this._formBuilder.group({
    user_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    role: ['', Validators.required],
    report_to: ['', Validators.required],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private toastrService: ToastrService,
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
    this.submitted=true;
    if(this.userForm.valid){
      const {user_name,email,password,phone,role,report_to}=this.userForm.value;
      const payload={
        user_name,email,password,phone,role,report_to,
        user_id:2
      }
  
        this.Propertyservice.postAPI('/add_user',payload).subscribe((res) => {
          if (res) {
            this.toastrService.success('Successfully regitered!');
            this.closeModal();
            this.userForm.reset();
            this.getUser();
            //this._router.navigate(['/home']);
            this.submitted=false;
    
          }
        },(err)=>{
          this.toastrService.error('something went wrong');
        });
    }
   
  
  }

 
closeModal():void{
  $("#userForm").modal("hide");
}

}
