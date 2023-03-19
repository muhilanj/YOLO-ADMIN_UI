import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropertyService } from "src/app/common/services/property.service";
import { CommmonService } from "../services/common.service";

@Component({
  selector: "app-price",
  templateUrl: "./price.component.html",
  styleUrls: ["./price.component.css"],
})
export class PriceComponent implements OnInit {
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = "";
  basicPropertyFormGroup = this._formBuilder.group({
    total_floor: ["", Validators.required],
    property_name: ["", Validators.required],
    state: ["", Validators.required],
    city: ["", Validators.required],
    area: ["", Validators.required],
    full_address: ["", Validators.required],
    phone_number: ["", Validators.required],
    email: ["", Validators.required],
    propertyDetails: ["", Validators.required],
    totalFloors: ["", Validators.required],
  });
  advancePropertyFormGroup = this._formBuilder.group({
    propertyImage: ["", Validators.required],
    propertyVideo: ["", Validators.required],
    propertyFacility: ["", Validators.required],
    propertyType: ["", Validators.required],
    upcomingStatus: ["", Validators.required],
  });
  singleOccupancyFormGroup = this._formBuilder.group({
    roomSize: ["", Validators.required],
    dimension: ["", Validators.required],
    chooseFloor: ["", Validators.required],
    rooms: ["", Validators.required],
    facilityAvailable: ["", Validators.required],
    singleOccupancyImage: ["", Validators.required],
    roomNumberCheck: ["", Validators.required],
    singleOccupancyVideo: ["", Validators.required],
    roomSpec: ["", Validators.required],
  });
  priceFormGroup = this._formBuilder.group({
    priceRoomSize: ["", Validators.required],
    priceDimension: ["", Validators.required],
    chooseFloor: ["", Validators.required],
    facilityAvailable: ["", Validators.required],
    advancePayment: ["", Validators.required],
    roomNumberCheck: ["", Validators.required],
    rent: ["", Validators.required],
    priceRoomSpec: ["", Validators.required],
    dimension: ["", Validators.required],
    roomSpec: ["", Validators.required],
  });

  public cityData: any[] = [];
  public areaData: any[] = [];
  public stateData: any[] = [];
  public propertyDetailsData: any[] = [];
  public occupancyData: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService
  ) {}
  ngOnInit() {
    this.getArea();
    this.getCity();
    this.getState();

    this.occupancyData = [
      {
        id: 0,
        name: "Signle Occupancy",
      },
      {
        id: 1,
        name: "Double Occupancy",
      },
      {
        id: 2,
        name: "Shared Occupancy",
      },
    ];
  }

  basicProperty() {
    // debugger;
    const {
      property_name,
      state,
      city,
      area,
      full_address,
      phone_number,
      email,
      propertyDetails,
      totalFloors,
    } = this.basicPropertyFormGroup.value;

    const payload = {
      area_Id: area,
      property_name: property_name,
      full_address: full_address,
      phone_number: phone_number,
      email: email,
      details: propertyDetails,
      total_floor: totalFloors,
      status: 1,
    };

    console.log(payload);
    this.Propertyservice.postAPI("property/add", payload).subscribe((res) => {
      if (res.status === 200) {
        this.propertyDetailsData = res.results;
      }
    });
  }

  public advancedProp(): void {
    console.log(this.advancePropertyFormGroup.value);
    console.log(this.selected);
  }

  getArea() {
    this.Propertyservice.getAPI("area").subscribe((res: any) => {
      this.areaData = res.results;
    });
  }

  getCity() {
    this.Propertyservice.getAPI("city").subscribe((res) => {
      this.cityData = res.results;
    });
  }
  getState() {
    this.Propertyservice.getAPI("state").subscribe((res) => {
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
