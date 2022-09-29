import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/common/services/property.service';
import { CommmonService } from '../services/common.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-basicproperty',
  templateUrl: './basicproperty.component.html',
  styleUrls: ['./basicproperty.component.css']
})
export class BasicpropertyComponent implements OnInit {
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = '';
  basicPropertyFormGroup = this._formBuilder.group({
    propertyName: ['', Validators.required],
    area: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    propertyDetails:['', Validators.required],
    
  });
  advancePropertyFormGroup = this._formBuilder.group({
    propertyImage: ['', Validators.required],
    propertyVideo: ['', Validators.required],
    propertyFacility: ['', Validators.required],
    propertyType: ['', Validators.required],
    upcomingStatus: ['', Validators.required],
  });
  singleOccupancyFormGroup = this._formBuilder.group({
    roomSize: ['', Validators.required],
    dimension: ['', Validators.required],
    chooseFloor: ['', Validators.required],
    rooms: ['', Validators.required],
    facilityAvailable: ['', Validators.required],
    singleOccupancyImage: ['', Validators.required],
    roomNumberCheck: ['', Validators.required],
    singleOccupancyVideo: ['', Validators.required],
    roomSpec: ['', Validators.required],
  });
  priceFormGroup = this._formBuilder.group({
    priceRoomSize: ['', Validators.required],
    priceDimension: ['', Validators.required],
    chooseFloor: ['', Validators.required],
    facilityAvailable: ['', Validators.required],
    advancePayment: ['', Validators.required],
    roomNumberCheck: ['', Validators.required],
    rent: ['', Validators.required],
    priceRoomSpec: ['', Validators.required],
  });

  public cityData: any[] = [];
  public areaData: any[] = [];
  public stateData: any[] = [];
  public propertyDetailsData: any[] = [];
  public occupancyData: any[] = [];

  constructor(
    public dialogService:DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router:Router
  ) {}
  ngOnInit() {
    this.getArea();
    this.getCity();
    this.getState();

    this.occupancyData = [
      {
        id: 0,
        name: 'Signle Occupancy',
      },
      {
        id: 1,
        name: 'Double Occupancy',
      },
      {
        id: 2,
        name: 'Shared Occupancy',
      },
    ];
  }

  basicProperty() {
    const {
      propertyName,
      area,
      address,
      phoneNumber,
      email,
      propertyDetails
    } = this.basicPropertyFormGroup.value;

    const payload = {
      area_id: area,
      property_name: propertyName,
      address: address,
      phone_number: phoneNumber,
      email: email,
      user_id: 1,
      property_details:propertyDetails
    };

    console.log(payload);
    this.Propertyservice.postAPI('/add_basic_property', payload).subscribe((res) => {
      if (res.status === 200) {
        this._router.navigate(['/advanceproperty']);
     
        this.propertyDetailsData = res.data;

      }
    });
  }

  public advancedProp(): void {
    console.log(this.advancePropertyFormGroup.value);
    console.log(this.selected);
  }

  getArea() {
    this.Propertyservice.getAPI('/area').subscribe((res: any) => {
      debugger
      this.areaData = res.data;
      
    });
  }

  getCity() {
    this.Propertyservice.getAPI('city').subscribe((res) => {
      this.cityData = res.results;
    });
  }
  getState() {
    this.Propertyservice.getAPI('state').subscribe((res) => {
      this.stateData = res.results;
    });
  }

  getFileDetails(ele: any) {
    //console.log (e.target.files);
    for (let item = 0; item < ele.target.files.length; item++) {
      this.myFiles.push(ele.target.files[item]);
    }
    console.log(this.myFiles);
  }
}
