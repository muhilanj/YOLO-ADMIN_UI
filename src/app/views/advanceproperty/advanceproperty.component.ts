import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PropertyService } from "src/app/common/services/property.service";
import { IntermediateData } from "../components/property-main/property-flow/property-flow.component";
import { CommmonService } from "../services/common.service";
import { DialogService } from "../services/dialog.service";

@Component({
  selector: "app-advanceproperty",
  templateUrl: "./advanceproperty.component.html",
  styleUrls: ["./advanceproperty.component.css"],
})
export class AdvancepropertyComponent implements OnInit {
  @Input() propertyId: any = undefined;

  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective | undefined; 
  @Output() messageEvent = new EventEmitter<IntermediateData>();
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  propertyDetailsData: any[] = [];
  @Output() onPropertyChange: EventEmitter<any> = new EventEmitter();

  advancePropertyFormGroup = this._formBuilder.group({
    propertyImage: [""],
    propertyVideo: [""],
    facility: this._formBuilder.array([], Validators.required),
    occupancyType: this._formBuilder.array([], Validators.required),
    propertyStatus: ["", Validators.required],
  });
  public occupancyData: any[] = [];
  public faclityData: any[] = [];

  constructor(
    private toastrService: ToastrService,
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getPropertyFacilities();
  }

  submitForm() {
    if (this.documentEditForm?.valid)
      this.documentEditForm?.ngSubmit.emit();
  }

  public onSubmitAdavanceProperty(): void {
    const {
      propertyImage,
      propertyVideo,
      propertyStatus,
      facility,
      occupancyType,
    } = this.advancePropertyFormGroup.value;

    const payload = {
      property_id: 1,
      categories: occupancyType.toString(),
      status: Number(propertyStatus),
      facilities: facility.toString(),
      user_id: 1,
      Images: "",
      videos: propertyVideo,
    };

    console.log(payload);
    this.Propertyservice.postAPI("/add_advanced_property", payload).subscribe(
      (res) => {
        console.log(res.data)
        try {
          if (res.status === 200) {
            this.propertyDetailsData = res.data;
            // this.advancePropertyFormGroup.reset();
            // this.faclityData = [];
            // this.occupancyData = [];
            // this.dialogService.openModal(
            //   "Property",
            //   res.message,
            //   () => {
            //     //confirmed
            //     console.log("Yes");
            //   },
            //   () => {
            //     //not confirmed
            //     console.log("No");
            //   }
            // );

            this.messageEvent.emit({
              data: res.data,
              canStepNext: true,
            });
          } else {
            throw new Error();
          }
        } catch (e) {
          this.messageEvent.emit({
            data: null,
            canStepNext: false,
          });

          this.toastrService.error("Error while adding advanced property");
        }
      }
    );
  }

  public advancedProp(): void {
    console.log(this.advancePropertyFormGroup.value);
    console.log(this.selected);
  }

  getCategories() {
    this.Propertyservice.getAPI("/category").subscribe((res) => {
      this.occupancyData = res.data;
    });
  }
  getPropertyFacilities() {
    this.Propertyservice.getAPI("/get_property_facilities").subscribe((res) => {
      this.faclityData = res.data;
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
    console.log(this.urls.length);
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
    console.log(occuType);
    this.Propertyservice.setShowLoginForm(occuType.value ?? null);
    this.onPropertyChange.emit(occuType.value ?? []);
  }
}
