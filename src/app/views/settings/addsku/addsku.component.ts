import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommmonService } from "../../services/common.service";
import { DialogService } from "../../services/dialog.service";
import { IntermediateData } from "../../components/property-main/property-flow/property-flow.component";

@Component({
  selector: 'app-addsku',
  templateUrl: './addsku.component.html',
  styleUrls: ['./addsku.component.css']
})
export class AddskuComponent implements OnInit {
  
  isSubmitSuccess = false;

  @Output() messageEvent = new EventEmitter<IntermediateData>();
  constructor(
    private toastRService: ToastrService,
    public dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private Skuservice: CommmonService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  addSkuFormGroup = this._formBuilder.group({
    SKU_name: ["", Validators.required],
    package_of_unit: ["", Validators.required],
    UOM: ["", Validators.required]
  });

  addSku() {
    // console.log("basicProperty");
    const { SKU_name, package_of_unit, UOM } =
      this.addSkuFormGroup.value;

    const payload = {
      SKU_name: SKU_name,
      package_of_unit: package_of_unit,
      UOM: UOM
    };
    this.Skuservice.postAPI("/sku", payload).subscribe(
      (res) => {
        console.log(res);
        try {
          if (res.message === "SKU added successfully") {
            this.messageEvent.emit({
              data: res.data,
              canStepNext: true,
            });
            this.isSubmitSuccess = true;

            this._router.navigate(["/sku-list"]);
            this.toastRService.success("SKU Added Successfully");
          } else {
            throw new Error();
          }
        } catch (e) {
          this.messageEvent.emit({
            data: null,
            canStepNext: false,
          });
          this.toastRService.error("Error while adding SKU");
        }
      }
    );

  }
}
