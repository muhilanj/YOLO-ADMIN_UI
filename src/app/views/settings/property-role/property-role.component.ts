import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommmonService } from '../../services/common.service';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-property-role',
  templateUrl: './property-role.component.html',
  styleUrls: ['./property-role.component.css']
})
export class PropertyRoleComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  public roleList:any;
  submitted=false;
  p:any;
  roleForm = this._formBuilder.group({
    name: ['', Validators.required],
    reporting_to: ['', Validators.required],
  });

  constructor(private toastrService: ToastrService,private Propertyservice: CommmonService,private _formBuilder: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.Propertyservice.getAPI('/get_roles').subscribe((res) => {
      this.roleList = res.data;
    });
  }

  basicProperty() {
    this.submitted=true;
    if(this.roleForm.valid){
      const {
        name,
        reporting_to
      } = this.roleForm.value;
  
      const payload = {
        role_name:name,
        reporting_role:reporting_to,
        user_id:2
      };
  
      console.log(payload);
      this.Propertyservice.postAPI('/add_role', payload).subscribe((res) => {
        if (res) {
          this.toastrService.success('Successfully regitered!');
          $("#roleModal").modal("hide");
          this.roleForm.reset();
          this.getRole();
          //this._router.navigate(['/home']);
          this.submitted=false;
  
        }
      },(err)=>{
        this.toastrService.error('something went wrong');
      });
    }
    }
  
  
  //call this wherever you want to close modal
  public closeModal(): void {
    $("#roleModal").modal("hide");
  }
}
