import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { CommmonService } from "./views/services/common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public section: boolean = false;
  public currentUrl: string = "";
  public isLogin: boolean = false;
  public panelOpenState = false;
  public multi = false;
  public displayMode = "default";
  public dataSet: any;
  public singleOccupancy: string = "";
  public doubleOccupancy: string = "";
  public sharedOccupancy: string = "";
  constructor(private router: Router, private _sharedSevice: CommmonService) {}

  ngOnInit(): void {
    // debugger;
    this._sharedSevice.getShowLoginForm().subscribe((val: any) => {
      this.dataSet = val;
      this.menuchange(this.dataSet);
    });

    if (this.router.url === "/login") {
      this.section = true;
    } else {
      this.section = false;
    }

    this.getRoute();
  }

  public menuchange(name: []): void {
    this.singleOccupancy = "";
    this.doubleOccupancy = "";
    this.sharedOccupancy = "";
    name.filter((data: string) => {
      if (data === "Single Occupancy") {
        this.singleOccupancy = data;
      } else if (data === "Double Occupancy") {
        this.doubleOccupancy = data;
      } else if (data === "Triple Occupancy" || "Four Occupancy") {
        this.sharedOccupancy = data;
      }
    });
  }
  public logout(): void {
    sessionStorage.removeItem("userData");
    this.router.navigate(["/login"]);
  }
  public getRoute() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        if (this.currentUrl === "/login") {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    });
  }
}
