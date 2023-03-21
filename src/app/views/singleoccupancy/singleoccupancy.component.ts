import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/common/services/property.service';
import { IntermediateData } from '../components/property-main/property-flow/property-flow.component';
import { CommmonService } from '../services/common.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-singleoccupancy',
  templateUrl: './singleoccupancy.component.html',
  styleUrls: ['./singleoccupancy.component.css']
})
export class SingleoccupancyComponent implements OnInit {
  
  @Input() propertyId: any = undefined;

  @Output() messageEvent = new EventEmitter<IntermediateData>();

  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective | undefined; 
  
  isLinear = false;
  checked: boolean = true;
  selected: any = [];
  urls: any[] = [];
  myFiles: string[] = [];
  sMsg: string = '';
  values:any[] = [];
  singleOccupancyFormGroup = this._formBuilder.group({
    totalFloors: ['', Validators.required],
    flatType: ['', Validators.required],
    dimension: ['', Validators.required],
    chooseFloor: ['', Validators.required],
    noOfRooms: ['', Validators.required],
    facilityAvailable: this._formBuilder.array([]),
    flatImage: ['', Validators.required],
    flatVideo: ['', Validators.required],
    roomNumberCheck: this._formBuilder.array([]),
    occupancyType:this._formBuilder.array([]),
  });


  public cityData: any[] = [];
  public areaData: any[] = [];
  public stateData: any[] = [];
  public propertyDetailsData: any[] = [];
  public occupancyData: any[] = [];
  public unit:string='';

  //data
  public flatTypeData:any[]=[];
  public roomFacilties:any[]=[];
  public floorValues:number[]=[];
  public roomValues:number[]=[];

  constructor(
    public dialogService:DialogService,
    private _formBuilder: FormBuilder,
    private Propertyservice: CommmonService
  ) {}
  ngOnInit() {
    this.getRoomFacilities();
    this.getFlatType();
    this.getCategories();
    this.values.push({value: ""});
    this.singleOccupancyFormGroup.get("flatType")?.valueChanges.subscribe(x => {
      this.formValueChanges(x)
   })
   this.singleOccupancyFormGroup.get("totalFloors")?.valueChanges.subscribe(x => {    
    if(x){
      this.floorsLooping(x)
    }
 })
 this.singleOccupancyFormGroup.get("noOfRooms")?.valueChanges.subscribe(x => {
  if(x){
    this.onChangeRoomCount(x)
  }
  
 
})
  }

  basicProperty() {
    const {
      totalFloors,
      occupancyType,
      flatType,
      dimension,
      chooseFloor,
      noOfRooms,
      facilityAvailable,
      flatImage,
      flatVideo,
      roomNumberCheck,
    } = this.singleOccupancyFormGroup.value;

    if (!this.propertyId) {
      this.messageEvent.emit({
        data: null, 
        canStepNext: false
      })
      return;
    }
    const payload = {
      property_id: this.propertyId,
      category_id: 1,
      total_floors:totalFloors,
      flat_type: flatType,
      dimension: dimension,
      floor_number: chooseFloor,
      total_rooms: noOfRooms,
      flat_facilities: facilityAvailable.toString(),
      images: this.urls,
      videos:flatVideo,
      flat_number:this.values,
      occupancy_type:occupancyType.toString(),
      user_id:1
    };

    console.log(payload);
    this.Propertyservice.postAPI('/add_flat_details', payload).subscribe((res) => {
      if (res.status === 200) {
        this.dialogService.openModal("Title1",res.message, ()=>{
          //confirmed
          console.log('Yes');
        }, ()=>{
          //not confirmed
          console.log('No');
        });
        this.propertyDetailsData = res.data;
        this.messageEvent.emit({
          data: res.data, 
          canStepNext: true
        })
      }
      else {
        this.messageEvent.emit({
          data: res.data, 
          canStepNext: false
        })
      }
    });
  }

  submitForm() {
    this.documentEditForm?.ngSubmit.emit();
  }

  getCategories() {
    this.Propertyservice.getAPI('/category').subscribe((res) => {
      this.occupancyData = res.data;
    });
  }

  getRoomFacilities() {
    this.Propertyservice.getAPI('/get_room_facilities').subscribe((res: any) => {
      this.roomFacilties = res.data;
    });
  }
  getFlatType() {
    this.Propertyservice.getAPI('/get_flat_type?categoryid=1').subscribe((res: any) => {
      this.flatTypeData = res.data;
    });
  }

  getFileDetails(ele: any) {
    //console.log (e.target.files);
    for (let item = 0; item < ele.target.files.length; item++) {
      this.myFiles.push(ele.target.files[item]);
    }
    console.log(this.myFiles);
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


  public formValueChanges(type:string):void{
    const domensiondata=this.flatTypeData.find(item=> item.flat_type===type)

  this.singleOccupancyFormGroup.get('dimension')?.patchValue(domensiondata.dimension);
  this.unit=domensiondata.unit;
  }

  public floorsLooping(x:number):void{
    this.floorValues=[];
    for(let i=1;i<=x;i++){
      this.floorValues.push(i)
    }

  }
  public onChangeRoomCount(x:number | string):void{
    this.roomValues=[];
    let value =100;
    for(let i=1;i<=x;i++){
      
      value++
    
      this.roomValues.push(value)
    }
    console.log({ room: this.roomValues })
  }

  public onChangeRoomValues(x: any, index: number): void {
    let vals = [...this.roomValues];
    vals[index] = parseInt(x.target.value);
    this.roomValues = vals;
  }
  
  public roomChanges(noOfRooms:string):void{  

  }


  onChangeFacility(event:any) {
    const interests = <FormArray>this.singleOccupancyFormGroup.get('facilityAvailable') as FormArray;

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }
  onChangeOccupancy(event:any) {
    const interests = <FormArray>this.singleOccupancyFormGroup.get('occupancyType') as FormArray;

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }
  onChangeRoomCountForm(event:any) {
    const interests = <FormArray>this.singleOccupancyFormGroup.get('roomNumberCheck') as FormArray;

    console.log(interests);

    if(event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }
  }

  removevalue(i:number){
    if(this.values.length>1){
      this.values.splice(i,1);
    }
    
  }

  addvalue(){
    this.values.push({value: ""});
  }
  
}



