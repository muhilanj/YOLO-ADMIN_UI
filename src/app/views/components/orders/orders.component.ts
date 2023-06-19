import { Component, Inject,OnInit } from "@angular/core";
import { CommmonService } from "../../services/common.service";
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  loader: boolean = true;
  public orderList: any;
  public orderDistList: any;
  public resultMap: any;
  public dataArray = new Array();
  p: any;
  searchText: string = ""; 
  constructor(private Propertyservice: CommmonService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loader = true;
    this.getOrders();
  }

  getOrders() {
    this.Propertyservice.getAPI("/get_orders").subscribe((res) => {
        this.orderList = res.data;
      let responseData = res.data;
      let resultMapTemp = new Map<String, Array<{}>>();

    let tempArray: Array<{}> = new Array();
    responseData.forEach(function (data) {
        if(resultMapTemp.get(data.Order_code)){
            
        }
        else{
            resultMapTemp.set(data.Order_code, [data]);
            tempArray.push(data);
        }        
    });

    console.log(tempArray);
    this.orderDistList = tempArray;


      this.loader = false;
    });

    
  }
  openDialog(datas: any): void {
    let data = new Array();
  
        console.log(datas);
        if(datas != null && datas != undefined)
    {
        this.dataArray = new Array();

        this.orderList.forEach(function (datass) {
            if(datass.order_id == datas){
                data.push(datass);
            }        
        });

        
    }console.log(data);

        const dialogRef = this.dialog.open(OrderDialog, {
            data,
          width: "1000px",
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          console.log("The dialog was closed");
        });
    

  }
  
}
@Component({
    selector: "order-dialog",
    templateUrl: "order-dialog.html",
    styleUrls: ["order-dialog.component.css"],
  })
  export class OrderDialog {
    constructor(
      public dialogRef: MatDialogRef<OrderDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
 
    
  }