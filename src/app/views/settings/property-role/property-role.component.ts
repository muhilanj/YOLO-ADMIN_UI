import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommmonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-property-role',
  templateUrl: './property-role.component.html',
  styleUrls: ['./property-role.component.css']
})
export class PropertyRoleComponent implements OnInit {
  cars: any[] = [];
  searchText: string='';
  public roleList:any;

  constructor(private Propertyservice: CommmonService) { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.Propertyservice.getAPI('/get_roles').subscribe((res) => {
      this.roleList = res.data;
    });
  }

}
