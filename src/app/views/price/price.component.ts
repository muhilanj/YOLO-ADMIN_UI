import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { PropertyService } from "src/app/common/services/property.service";
import { CommmonService } from "../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-price",
  templateUrl: "./price.component.html",
  styleUrls: ["./price.component.css"],
})
export class PriceComponent implements OnInit {
  @ViewChild("documentEditForm") documentEditForm:
    | FormGroupDirective
    | undefined;

  @Input() propertyId: any = undefined;

  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = "";
  @Input() property_id: any = undefined;
  public checks: Array<any> = [
    { description: "101", value: "101" },
    { description: "102", value: "102" },
    { description: "103", value: "103" },
    { description: "104", value: "104" },
    { description: "105", value: "105" },
    { description: "106", value: "106" },
  ];
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
    duration: ["", Validators.required],
    rooms: new FormArray([]),
  });

  public cityData: any[] = [];
  public areaData: any[] = [];
  public stateData: any[] = [];
  public propertyDetailsData: any[] = [];
  public occupancyData: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router
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

  onCheckChange(event: any) {
    const formArray: FormArray = this.priceFormGroup.get("rooms") as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  basicProperty() {
    // debugger;
    const {
      priceRoomSize,
      priceDimension,
      chooseFloor,
      facilityAvailable,
      advancePayment,
      roomNumberCheck,
      rent,
      priceRoomSpec,
      dimension,
      roomSpec,
      duration,
      rooms,
    } = this.priceFormGroup.value;

    const payload = {
      property_id: this.property_id,
      Floor_number: chooseFloor,
      room_size: priceRoomSize,
      Dimension: dimension + roomSpec,
      rooms: rooms?.join(","),
      rent: rent,
      duration: duration,
      advance_amount: advancePayment,
      occupancy_type: "",
      user_id: "",
    };

    console.log(payload);
    this.Propertyservice.postAPI("/add_flat_price", payload).subscribe(
      (res) => {
        if (res.status === 200) {
          this.propertyDetailsData = res.results;
          this._router.navigate(["/property-main"]);
        }
      }
    );
  }

  // public advancedProp(): void {
  //   console.log(this.advancePropertyFormGroup.value);
  //   console.log(this.selected);
  // }

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

  submitForm() {
    this.documentEditForm?.ngSubmit.emit();
  }

  getFileDetails(ele: any) {
    //console.log (e.target.files);
    for (let item = 0; item < ele.target.files.length; item++) {
      this.myFiles.push(ele.target.files[item]);
    }
    console.log(this.myFiles);
  }
}
