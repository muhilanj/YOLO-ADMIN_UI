import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";

export type IntermediateData = {
  data: any, 
  canStepNext: boolean
};
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
  isLinear = true;
  selectedPropertyTypes: any[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  basicPropertyMessage: IntermediateData = {
    data: null, 
    canStepNext: false
  };

  receiveMessageFromBasicProperty($event: any) {
    this.basicPropertyMessage = $event
  }

  advancedPropertyMessage: IntermediateData = {
    data: null, 
    canStepNext: false
  };

  receiveMessageFromAdvancedProperty($event: any) {
    this.advancedPropertyMessage = $event
  }

  singleOccupancyMessage: IntermediateData = {
    data: null, 
    canStepNext: false
  };

  receiveMessageFromSingleOccupancy($event: any) {
    this.singleOccupancyMessage = $event
  }

  dualOccupancyMessage: IntermediateData = {
    data: null, 
    canStepNext: false
  };

  receiveMessageFromDualOccupancy($event: any) {
    this.dualOccupancyMessage = $event
  }

  tripleOccupancyMessage: IntermediateData = {
    data: null, 
    canStepNext: false
  };

  receiveMessageFromTripleOccupancy($event: any) {
    this.tripleOccupancyMessage = $event
  }


  ngOnInit(): void {}

  onPropertyChange(event: any) {
    this.selectedPropertyTypes = event;
  }
}
