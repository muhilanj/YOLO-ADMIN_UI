import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { AdvancepropertyComponent } from "src/app/views/advanceproperty/advanceproperty.component";
import { BasicpropertyComponent } from "src/app/views/basicproperty/basicproperty.component";
import { DoubleComponent } from "src/app/views/double/double.component";
import { PriceComponent } from "src/app/views/price/price.component";
import { SharedComponent } from "src/app/views/shared/shared.component";
import { SingleoccupancyComponent } from "src/app/views/singleoccupancy/singleoccupancy.component";

export type IntermediateData = {
  data: any;
  canStepNext: boolean;
};
@Component({
  selector: "app-property-flow",
  templateUrl: "./property-flow.component.html",
  styleUrls: ["./property-flow.component.css"],
})
export class PropertyFlowComponent implements OnInit {
  @ViewChild(BasicpropertyComponent, { static: true }) basicProperty:
    | BasicpropertyComponent
    | undefined;
  @ViewChild(AdvancepropertyComponent, { static: true }) advancedProperty:
    | AdvancepropertyComponent
    | undefined;
  @ViewChild(SingleoccupancyComponent, { static: false }) singleOccupancy:
    | SingleoccupancyComponent
    | undefined;
  @ViewChild(DoubleComponent, { static: false }) doubleOccupancy:
    | DoubleComponent
    | undefined;
  @ViewChild(SharedComponent, { static: false }) sharedOccupancy:
    | SharedComponent
    | undefined;
  @ViewChild(PriceComponent, { static: true }) priceComp:
    | PriceComponent
    | undefined;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  isLinear = true;
  selectedPropertyTypes: any[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  basicPropertyMessage: IntermediateData = {
    data: null,
    canStepNext: false,
  };

  receiveMessageFromBasicProperty($event: any) {
    this.basicPropertyMessage = $event;
  }

  onClickBasicNext() {
    if (this.basicPropertyMessage.canStepNext) return;
    this.basicProperty?.submitForm();
  }

  advancedPropertyMessage: IntermediateData = {
    data: null,
    canStepNext: false,
  };

  receiveMessageFromAdvancedProperty($event: any) {
    this.advancedPropertyMessage = $event;
  }

  onClickAdvancedNext() {
    if (this.advancedPropertyMessage.canStepNext) return;
    // this.advancedProperty?.submitForm();
  }

  singleOccupancyMessage: IntermediateData = {
    data: null,
    canStepNext: false,
  };

  receiveMessageFromSingleOccupancy($event: any) {
    this.singleOccupancyMessage = $event;
  }

  onClickSingleOccupancy() {
    if (this.singleOccupancyMessage.canStepNext) return;
    console.log("onClickSingleOccupancy", this.singleOccupancy);
    this.singleOccupancy?.submitForm();
  }

  dualOccupancyMessage: IntermediateData = {
    data: null,
    canStepNext: false,
  };

  receiveMessageFromDualOccupancy($event: any) {
    this.dualOccupancyMessage = $event;
  }

  onClickDoubleOccupancy() {
    if (this.dualOccupancyMessage.canStepNext) return;
    this.doubleOccupancy?.submitForm();
  }

  tripleOccupancyMessage: IntermediateData = {
    data: null,
    canStepNext: false,
  };

  receiveMessageFromTripleOccupancy($event: any) {
    this.tripleOccupancyMessage = $event;
  }

  onClickSharedOccupancy() {
    if (this.tripleOccupancyMessage.canStepNext) return;
    this.sharedOccupancy?.submitForm();
  }

  onClickPrice() {
    this.priceComp?.submitForm();
  }

  ngOnInit(): void {}

  onPropertyChange(event: any) {
    this.selectedPropertyTypes = event;
  }
}
