import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-property-flow",
  templateUrl: "./property-flow.component.html",
  styleUrls: ["./property-flow.component.css"],
})
export class PropertyFlowComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  isLinear = false;
  selectedPropertyTypes: any[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onPropertyChange(event: any) {
    this.selectedPropertyTypes = event;
  }
}
