import { Component, OnInit } from '@angular/core';
import { CommmonService } from '../../services/common.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
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
