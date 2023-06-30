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
  selector: "app-advanceproperty",
  templateUrl: "./advanceproperty.component.html",
  styleUrls: ["./advanceproperty.component.css"],
})
export class AdvancepropertyComponent implements OnInit {
  @Input() propertyId: any = undefined;

  @ViewChild("documentEditForm") documentEditForm:
    | FormGroupDirective
    | undefined;
  @Output() messageEvent = new EventEmitter<IntermediateData>();
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  propertyDetailsData: any[] = [];
  occupancyDetails: Record<string, any> = {
    single: undefined,
    double: undefined,
    shared: undefined,
  };
  loader: boolean = false;
  @Output() onPropertyChange: EventEmitter<any> = new EventEmitter();

  advancePropertyFormGroup = this._formBuilder.group({
    propertyImage: [""],
    propertyVideo: [""],
    facility: this._formBuilder.array([], Validators.required),
    occupancyType: this._formBuilder.array([], Validators.required),
    propertyStatus: ["", Validators.required],
    totalFloors: ["", Validators.required],
  });
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

  public faclityData: any[] = [];
  public properties_type: any[] = [];

  constructor(
    private toastrService: ToastrService,
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    public dialog: MatDialog,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
        console.log(params)
        this.propertyId = params.id;
      }
    )
    console.log(this.route.snapshot.params)
    this.loader = true;
    this.getPropertyFacilities();
    this.getPropertiesType();
  }

  openDialog(data: any, occupancyDetails: any): void {
    // const dialogRef = this.dialog.open(OccupancyDialog, {
    //   data: { data, formDetails: occupancyDetails },
    //   width: "1000px",
    // });
    // dialogRef.componentInstance.onSubmitEvent.subscribe((payload: any) => {
    //   this.occupancyDetails[payload.category] = payload.data;
    //   this.occupancyDetails[payload.category + "_form"] = payload.formData;
    // });
  }

  deleteDetails(occupancy: any) {
    if (this.occupancyDetails[occupancy.key]) {
      this.occupancyDetails[occupancy.key] = undefined;
      this.occupancyDetails[occupancy.key + "_form"] = undefined;
    }
  }

  public onSubmitAdavanceProperty(): void {
    const {
      propertyImage,
      propertyVideo,
      propertyStatus,
      facility,
      occupancyType,
      totalFloors
    } = this.advancePropertyFormGroup.value;

    const payload = {
      property_id: parseInt(this.propertyId),
      categories: occupancyType.toString(),
      status: Number(propertyStatus),
      facilities: facility.toString(),
      // occupancyType: occupancyType.toString(),
      user_id: 1,
      Images: propertyImage,
      videos: propertyVideo,
      total_floors: totalFloors
    };

    this.Propertyservice.postAPI("/add_advanced_property", payload).subscribe(
      (res) => {
        try {
          if (res.status === 200) {
            this.propertyDetailsData = res.data;
            this.toastrService.success("Advanced Property Added Successfully");

            this._router.navigate(["/occupancy"], {
              queryParams: { id: this.propertyId, total_floors: totalFloors },
            });
        
          } else {
            throw new Error();
          }
        } catch (e) {

          this.toastrService.error("Error while adding advanced property");
        }
      }
    );
  }

  getPropertyFacilities() {
    this.Propertyservice.getAPI("/get_property_facilities").subscribe((res) => {
      this.faclityData = res.data;
      this.loader = false;
    });
  }
  getPropertiesType() {
    this.Propertyservice.getAPI("/property_type").subscribe((res) => {
      this.properties_type = res.data;
      console.log(this.properties_type);
      this.loader = false;
    });
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

  onChangeFacility(event: any) {
    const interests = (<FormArray>(
      this.advancePropertyFormGroup.get("facility")
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
  onChangePropertyType(event: any) {
    // debugger;
    const occuType = (<FormArray>(
      this.advancePropertyFormGroup.get("occupancyType")
    )) as FormArray;

    if (event.checked) {
      occuType.push(new FormControl(event.source.value));
    } else {
      const i = occuType.controls.findIndex(
        (x) => x.value === event.source.value
      );
      occuType.removeAt(i);
    }
    this.Propertyservice.setShowLoginForm(occuType.value ?? null);
    this.onPropertyChange.emit(occuType.value ?? []);
  }
}

// @Component({
//   selector: "app-occupancy-dialog",
//   templateUrl: "./occupancy.dialog.html",
//   styleUrls: ["./occupancy.dialog.css"],
// })
// export class OccupancyDialog {
//   @ViewChild("documentEditForm") documentEditForm:
//     | FormGroupDirective
//     | undefined;
//   constructor(
//     private toastrService: ToastrService,
//     public dialogRef: MatDialogRef<any>,
//     @Inject(MAT_DIALOG_DATA) public occupancyData: any,
//     public dialogService: DialogService,
//     private _formBuilder: FormBuilder,
//     private Propertyservice: CommmonService
//   ) {
//     this.dialogRef.disableClose = true;
//   }

//   isOpen = true;
//   onSubmitEvent = new EventEmitter();

//   isLinear = false;
//   checked: boolean = true;
//   selected: any = [];
//   urls: any[] = [];
//   myFiles: string[] = [];
//   sMsg: string = "";
//   values: any[] = [];
//   occupancyFormGroup = this._formBuilder.group({
//     totalFloors: ["", Validators.required],
//     flatType: ["", Validators.required],
//     dimension: ["", Validators.required],
//     chooseFloor: ["", Validators.required],
//     noOfRooms: ["", Validators.required],
//     facilityAvailable: this._formBuilder.array([], Validators.required),
//     flatImage: [""],
//     flatVideo: [""],
//     roomNumberCheck: this._formBuilder.array([]),
//     advancePayment: ["", Validators.required],
//     rent: ["", Validators.required],
//     duration: ["", Validators.required],
//   });

//   public cityData: any[] = [];
//   public areaData: any[] = [];
//   public stateData: any[] = [];
//   public propertyDetailsData: any[] = [];
//   public unit: string = "";
//   public flatTypeData: any[] = [];
//   public roomFacilties: any[] = [];
//   public floorValues: number[] = [];
//   public roomValues: number[] = [];

//   ngOnInit() {
//     if (this.occupancyData?.formDetails) {
//       this.occupancyFormGroup = this.occupancyData?.formDetails;
//       if (this.occupancyFormGroup?.value?.totalFloors) {
//         this.floorsLooping(this.occupancyFormGroup?.value?.totalFloors);
//       }
//       if (this.occupancyFormGroup?.value?.noOfRooms) {
//         this.roomValues = this.occupancyFormGroup?.value?.roomNumberCheck;
//       }
//     }

//     this.values.push({ value: "" });
//     this.occupancyFormGroup.get("flatType")?.valueChanges.subscribe((x) => {
//       this.formValueChanges(x);
//     });
//     this.occupancyFormGroup.get("totalFloors")?.valueChanges.subscribe((x) => {
//       if (x) {
//         this.floorsLooping(x);
//       }
//     });
//     this.occupancyFormGroup.get("noOfRooms")?.valueChanges.subscribe((x) => {
//       if (x) {
//         this.onChangeRoomCount(x);
//       }
//     });
//     this.getRoomFacilities();
//     this.getFlatType();
//   }

//   onSubmit() {
//     if (!this.documentEditForm?.valid) {
//       console.log("invalid");
//       this.toastrService.error("Please enter all fields");
//       return;
//     }

//     // if (!this.isOpen) {
//     //   return;
//     // }

//     const {
//       totalFloors,
//       flatType,
//       dimension,
//       chooseFloor,
//       noOfRooms,
//       facilityAvailable,
//       flatImage,
//       flatVideo,
//       roomNumberCheck,
//     } = this.occupancyFormGroup.value;

//     const payload = {
//       category_id: this.occupancyData?.data.category_id,
//       total_floors: totalFloors,
//       flat_type: flatType,
//       dimension: dimension,
//       floor_number: chooseFloor,
//       total_rooms: noOfRooms,
//       flat_facilities: facilityAvailable,
//       images: this.urls,
//       videos: flatVideo,
//       flat_number: this.roomValues,
//       occupancy_type: this.occupancyData?.data?.key,
//     };

//     let roomsControl = (<FormArray>(
//       this.occupancyFormGroup.get("roomNumberCheck")
//     )) as FormArray;
//     this.roomValues.forEach((value: any) => {
//       roomsControl.push(new FormControl(value));
//     });
//     this.onSubmitEvent.emit({
//       category: this.occupancyData?.data.key,
//       data: payload,
//       formData: this.occupancyFormGroup,
//     });

//     this.dialogRef.close();
//   }

//   onNoClose() {}
//   getRoomFacilities() {
//     this.Propertyservice.getAPI("/get_room_facilities").subscribe(
//       (res: any) => {
//         this.roomFacilties = res.data.map((e: any) => ({
//           ...e,
//           checked: false,
//         }));
//         if (this.occupancyFormGroup?.value?.facilityAvailable) {
//           this.roomFacilties.forEach((item) => {
//             if (
//               this.occupancyFormGroup?.value?.facilityAvailable?.includes(
//                 item.facility_id
//               )
//             ) {
//               item.checked = true;
//             }
//           });
//         }
//       }
//     );
//   }
//   getFlatType() {
//     this.Propertyservice.getAPI("/get_flat_type?categoryid=1").subscribe(
//       (res: any) => {
//         this.flatTypeData = res.data;
//       }
//     );
//   }

//   getFileDetails(ele: any) {
//     for (let item = 0; item < ele.target.files.length; item++) {
//       this.myFiles.push(ele.target.files[item]);
//     }
//   }

//   onSelectFile(event: any) {
//     if (event.target.files && event.target.files[0]) {
//       var filesAmount = event.target.files.length;
//       for (let i = 0; i < filesAmount; i++) {
//         var reader = new FileReader();
//         reader.onload = (event: any) => {
//           this.urls.push(event.target.result);
//         };
//         reader.readAsDataURL(event.target.files[i]);
//       }
//     }
//   }

//   public formValueChanges(type: string): void {
//     const domensiondata = this.flatTypeData.find(
//       (item) => item.flat_type === type
//     );

//     this.occupancyFormGroup
//       .get("dimension")
//       ?.patchValue(domensiondata.dimension);
//     this.unit = domensiondata.unit;
//   }

//   public floorsLooping(x: number): void {
//     this.floorValues = [];
//     for (let i = 1; i <= x; i++) {
//       this.floorValues.push(i);
//     }
//   }

//   public onChangeRoomCount(x: number | string): void {
//     this.roomValues = [];
//     let value = 100;
//     for (let i = 1; i <= x; i++) {
//       value++;

//       this.roomValues.push(value);
//     }
//   }

//   public onChangeRoomValues(x: any, index: number): void {
//     let vals = [...this.roomValues];
//     vals[index] = x.target.value;
//     this.roomValues = vals;
//   }

//   onChangeFacility(event: any, index: number) {
//     this.roomFacilties[index]["checked"] = !event.checked;
//     const interests = (<FormArray>(
//       this.occupancyFormGroup.get("facilityAvailable")
//     )) as FormArray;

//     if (event.checked) {
//       interests.push(new FormControl(event.source.value));
//     } else {
//       const i = interests.controls.findIndex(
//         (x) => x.value === event.source.value
//       );
//       interests.removeAt(i);
//     }
//   }

//   onChangeOccupancy(event: any) {
//     const interests = (<FormArray>(
//       this.occupancyFormGroup.get("occupancyType")
//     )) as FormArray;

//     if (event.checked) {
//       interests.push(new FormControl(event.source.value));
//     } else {
//       const i = interests.controls.findIndex(
//         (x) => x.value === event.source.value
//       );
//       interests.removeAt(i);
//     }
//   }

//   onChangeRoomCountForm(event: any) {
//     const interests = (<FormArray>(
//       this.occupancyFormGroup.get("roomNumberCheck")
//     )) as FormArray;

//     if (event.checked) {
//       interests.push(new FormControl(event.source.value));
//     } else {
//       const i = interests.controls.findIndex(
//         (x) => x.value === event.source.value
//       );
//       interests.removeAt(i);
//     }
//   }
//   submitForm() {
//     if (!this.documentEditForm?.valid) {
//       return;
//     }

//     if (!this.isOpen) {
//       return;
//     }

//     const {
//       totalFloors,
//       flatType,
//       dimension,
//       chooseFloor,
//       noOfRooms,
//       facilityAvailable,
//       flatImage,
//       flatVideo,
//       roomNumberCheck,
//     } = this.occupancyFormGroup.value;

//     const payload = {
//       category_id: this.occupancyData?.data.category_id,
//       total_floors: totalFloors,
//       flat_type: flatType,
//       dimension: dimension,
//       floor_number: chooseFloor,
//       total_rooms: noOfRooms,
//       flat_facilities: facilityAvailable,
//       images: this.urls,
//       videos: flatVideo,
//       flat_number: this.roomValues,
//       occupancy_type: this.occupancyData?.data?.key,
//     };

//     this.onSubmitEvent.emit({
//       category: this.occupancyData?.data.key,
//       data: payload,
//       formData: this.occupancyFormGroup,
//     });

//     this.dialogRef.close();
//   }
// }
