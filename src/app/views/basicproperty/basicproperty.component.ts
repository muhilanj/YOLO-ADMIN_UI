import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PropertyService } from "src/app/common/services/property.service";
import { IntermediateData } from "../components/property-main/property-flow/property-flow.component";
import { CommmonService } from "../services/common.service";
import { DialogService } from "../services/dialog.service";

@Component({
  selector: "app-basicproperty",
  templateUrl: "./basicproperty.component.html",
  styleUrls: ["./basicproperty.component.css"],
})
export class BasicpropertyComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<IntermediateData>();

  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective | undefined; 
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = "";
  basicPropertyFormGroup = this._formBuilder.group({
    propertyName: ["", Validators.required],
    area: ["", Validators.required],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern(/^(0|91)?[6-9][0-9]{9}$/)],
    ],
    email: ["", [Validators.required, Validators.email]],
    address: ["", Validators.required],
    propertyDetails: ["", Validators.required],
  });

  public canStepNext = false;
  propertyDetailsData: any;
  areaData: any;
  cityData: any;
  stateData: any;

  constructor(
    private toastRService: ToastrService,
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getArea();
    this.getCity();
    this.getState();
  }

  basicProperty() {
    console.log("basicProperty")
    const { propertyName, area, address, phoneNumber, email, propertyDetails } =
      this.basicPropertyFormGroup.value;

    const payload = {
      area_id: area,
      property_name: propertyName,
      address: address,
      phone_number: phoneNumber,
      email: email,
      user_id: 1,
      property_details: propertyDetails,
    };

    this.Propertyservice.postAPI("/add_basic_property", payload).subscribe(
      (res) => {
        try {
          console.log(res.status, res.data);
          if (res.status === 200) {
            this.messageEvent.emit({
              data: res.data,
              canStepNext: true,
            });
            // this.router.navigate([], {
            //   relativeTo: this.route,
            //   queryParams: {
            //     id: "4",
            //   },
            // });
          } else {
            throw new Error();
          }
        } catch (e) {
          this.messageEvent.emit({
            data: null,
            canStepNext: false,
          });
          this.toastRService.error("Error while adding basic property");
        }
      }
    );
  }

  submitForm() {
    console.log("Submitted")
    this.documentEditForm?.ngSubmit.emit();
  }

  getArea() {
    this.Propertyservice.getAPI("/area").subscribe((res: any) => {
      this.areaData = res.data;
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
}
