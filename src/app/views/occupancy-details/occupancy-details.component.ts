import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PropertyService } from "src/app/common/services/property.service";
import { IntermediateData } from "../components/property-main/property-flow/property-flow.component";
import { CommmonService } from "../services/common.service";
import { DialogService } from "../services/dialog.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-occupancy-details",
  templateUrl: "./occupancy-details.component.html",
  styleUrls: ["./occupancy-details.component.css"],
})
export class OccupancyDetailsComponent implements OnInit {
  occupancyDetails: any = {};
  occupancyFormDetails: any = {};

  totalFloors: number = 0;
  public occupancyData: any[] = [
    {
      category_id: 1,
      category_name: "Single Occupancy",
      key: "single",
    },
    {
      category_id: 2,
      category_name: "Double Occupancy",
      key: "double",
    },
    {
      category_id: 1,
      category_name: "Shared Occupancy",
      key: "shared",
    },
  ];
  property_id: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private _router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.property_id = params.id;
      this.totalFloors = params.total_floors;
      for (let i = 1; i <= this.totalFloors; i++) {
        this.occupancyDetails[i] = undefined;
        this.occupancyFormDetails[i] = undefined;
      }
    });
  }

  selectedAtleastOne() {
    return Object.values(this.occupancyDetails).some((v) => v);
  }

  onSubmitOccupancy() {
    if (this.selectedAtleastOne()) {
      this._router.navigate(["/property-main"])
    }
  }

  openDialog(floorNumber?: any): void {
    console.log(floorNumber);
    const dialogRef = this.dialog.open(OccupancyDialog, {
      data: {
        floorNumber,
        formDetails: this.occupancyFormDetails[floorNumber],
        totalFloors: this.totalFloors,
        property_id: this.property_id
      },
      width: "1000px",
    });
    dialogRef.componentInstance.onSubmitEvent.subscribe((payload: any) => {
      this.occupancyDetails[payload.floorNumber] = payload.data;
      this.occupancyFormDetails[payload.floorNumber] = payload.formData;
      console.log(this.occupancyDetails, this.occupancyFormDetails);
    });
  }

  delete(floorNumber: any) {
    //TODO: Call delete API 
  }
}

@Component({
  selector: "app-occupancy-dialog",
  templateUrl: "./occupancy.dialog.html",
  styleUrls: ["./occupancy.dialog.css"],
})
export class OccupancyDialog {
  @ViewChild("documentEditForm") documentEditForm:
    | FormGroupDirective
    | undefined;
  propertyId: any;
  constructor(
    private toastrService: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public occupancyData: any,
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router
  ) {
    this.dialogRef.disableClose = true;
  }

  isOpen = true;
  onSubmitEvent = new EventEmitter();

  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = "";
  values: any[] = [];
  occupancyFormGroup = this._formBuilder.group({
    flatType: ["", Validators.required],
    occupancyType: ["", Validators.required],
    dimension: ["", Validators.required],
    noOfRooms: ["", Validators.required],
    facilityAvailable: this._formBuilder.array([], Validators.required),
    flatImage: [""],
    flatVideo: [""],
    roomNumberCheck: this._formBuilder.array([]),
    advancePayment: ["", Validators.required],
    rent: ["", Validators.required],
    duration: ["", Validators.required],
  });

  public cityData: any[] = [];
  public areaData: any[] = [];
  public stateData: any[] = [];
  public propertyDetailsData: any[] = [];
  public unit: string = "";
  public flatTypeData: any[] = [];
  public roomFacilties: any[] = [];
  public floorValues: number[] = [];
  public roomValues: number[] = [];

  public totalFloors: number = 0;

  ngOnInit() {
    this.propertyId = this.occupancyData.property_id;
    this.totalFloors = this.occupancyData.totalFloors;
    if (this.occupancyData?.formDetails) {
      this.occupancyFormGroup = this.occupancyData?.formDetails;
      if (this.occupancyFormGroup?.value?.totalFloors) {
        this.floorsLooping(this.occupancyFormGroup?.value?.totalFloors);
      }
      if (this.occupancyFormGroup?.value?.noOfRooms) {
        this.roomValues = this.occupancyFormGroup?.value?.roomNumberCheck;
      }
    }

    this.values.push({ value: "" });
    this.occupancyFormGroup.get("flatType")?.valueChanges.subscribe((x) => {
      this.formValueChanges(x);
    });
    this.occupancyFormGroup.get("totalFloors")?.valueChanges.subscribe((x) => {
      if (x) {
        this.floorsLooping(x);
      }
    });
    this.occupancyFormGroup.get("noOfRooms")?.valueChanges.subscribe((x) => {
      if (x) {
        this.onChangeRoomCount(x);
      }
    });
    this.getRoomFacilities();
    this.getFlatType();
  }

  onSubmit() {
    if (!this.occupancyFormGroup?.valid) {
      console.log("invalid");
      this.toastrService.error("Please enter all fields");
      return;
    }

    const {
      flatType,
      dimension,
      noOfRooms,
      facilityAvailable,
      flatVideo,
      occupancyType,
      rent,
      duration,
      advancePayment,
    } = this.occupancyFormGroup.value;
    const payload = {
      user_id: 1,
      property_id: this.propertyId,
      room_size: flatType,
      dimension: dimension,
      Floor_number: this.occupancyData.floorNumber,
      advance_amount: advancePayment,
      total_rooms: noOfRooms,
      flat_facilities: facilityAvailable,
      duration: duration,
      images: this.urls,
      rent: rent,
      videos: flatVideo,
      flat_number: this.roomValues.map((s) => s.toString()).join(","),
      category_name: occupancyType,
      occupancy_type: 'Any',
    };

    let roomsControl = (<FormArray>(
      this.occupancyFormGroup.get("roomNumberCheck")
    )) as FormArray;
    this.roomValues.forEach((value: any) => {
      roomsControl.push(new FormControl(value));
    });

    this.Propertyservice.postAPI("/add_flats_price", payload).subscribe(
      (res) => {
        try {
          if (res.status === 200) {
            this.onSubmitEvent.emit({
              floorNumber: this.occupancyData?.floorNumber,
              data: payload,
              formData: this.occupancyFormGroup,
            });
          } else {
            throw new Error();
          }
        } catch (e) {
          this.toastrService.error("Error while adding advanced property");
        }
      }
    );

    this.dialogRef.close();
  }

  onNoClose() {}
  getRoomFacilities() {
    this.Propertyservice.getAPI("/get_room_facilities").subscribe(
      (res: any) => {
        this.roomFacilties = res.data.map((e: any) => ({
          ...e,
          checked: false,
        }));
        if (this.occupancyFormGroup?.value?.facilityAvailable) {
          this.roomFacilties.forEach((item) => {
            if (
              this.occupancyFormGroup?.value?.facilityAvailable?.includes(
                item.facility_id
              )
            ) {
              item.checked = true;
            }
          });
        }
      }
    );
  }
  getFlatType() {
    this.Propertyservice.getAPI("/get_flat_type?categoryid=1").subscribe(
      (res: any) => {
        this.flatTypeData = res.data;
        console.log({ type: this.flatTypeData })
      }
    );
  }

  getFileDetails(ele: any) {
    for (let item = 0; item < ele.target.files.length; item++) {
      this.myFiles.push(ele.target.files[item]);
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  public formValueChanges(type: string): void {
    const domensiondata = this.flatTypeData.find(
      (item) => item.flat_type === type
    );

    this.occupancyFormGroup
      .get("dimension")
      ?.patchValue(domensiondata.dimension);
    this.unit = domensiondata.unit;
  }

  public floorsLooping(x: number): void {
    this.floorValues = [];
    for (let i = 1; i <= x; i++) {
      this.floorValues.push(i);
    }
  }

  public onChangeRoomCount(x: number | string): void {
    this.roomValues = [];
    let value = 100;
    for (let i = 1; i <= x; i++) {
      value++;

      this.roomValues.push(value);
    }
  }

  public onChangeRoomValues(x: any, index: number): void {
    let vals = [...this.roomValues];
    vals[index] = x.target.value;
    this.roomValues = vals;
  }

  onChangeFacility(event: any, index: number) {
    this.roomFacilties[index]["checked"] = !event.checked;
    const interests = (<FormArray>(
      this.occupancyFormGroup.get("facilityAvailable")
    )) as FormArray;

    if (event.checked) {
      interests.push(new FormControl(event.source.value));
    } else {
      const i = interests.controls.findIndex(
        (x) => x.value === event.source.value
      );
      interests.removeAt(i);
    }
  }

  onChangeOccupancy(event: any) {
    const interests = (<FormArray>(
      this.occupancyFormGroup.get("occupancyType")
    )) as FormArray;

    if (event.checked) {
      interests.push(new FormControl(event.source.value));
    } else {
      const i = interests.controls.findIndex(
        (x) => x.value === event.source.value
      );
      interests.removeAt(i);
    }
  }

  onChangeRoomCountForm(event: any) {
    const interests = (<FormArray>(
      this.occupancyFormGroup.get("roomNumberCheck")
    )) as FormArray;

    if (event.checked) {
      interests.push(new FormControl(event.source.value));
    } else {
      const i = interests.controls.findIndex(
        (x) => x.value === event.source.value
      );
      interests.removeAt(i);
    }
  }
}
