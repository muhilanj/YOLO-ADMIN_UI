import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppNavComponent } from "./views/components/app-nav/app-nav.component";
import { SignupComponent } from "./views/components/signup/signup.component";
import { LoginComponent } from "./views/components/login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PropertyComponent } from "./views/property/property.component";
import { MaterialModule } from "./views/property/material.module";
import { appConfig } from "./AppConfig/appConfig";
import { CommmonService } from "./views/services/common.service";
import { Chart, ChartModule } from "angular-highcharts";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { NgxPaginationModule } from "ngx-pagination";
import { BasicpropertyComponent } from "./views/basicproperty/basicproperty.component";
import { AdvancepropertyComponent } from "./views/advanceproperty/advanceproperty.component";
import { SingleoccupancyComponent } from "./views/singleoccupancy/singleoccupancy.component";
import { PriceComponent } from "./views/price/price.component";
import { DoubleComponent } from "./views/double/double.component";
import { SharedComponent } from "./views/shared/shared.component";
import { DialogService } from "./views/services/dialog.service";
import { DialogComponent } from "./views/dialog/dialog.component";
import { DialogTemplateComponent } from "./views/dialog-template/dialog-template.component";
import { GuestListComponent } from "./views/components/guest-list/guest-list.component";
import { GuestDialog } from "./views/components/guest-list/guest-list.component";

import { FilterPipe } from "./common/filter.pipe";
import { ResetPasswordComponent } from "./views/components/reset-password/reset-password.component";
import { SettingsComponent } from "./views/settings/settings.component";
import { PropertySettingsComponent } from "./views/settings/property-settings/property-settings.component";
import { PropertyUserComponent } from "./views/settings/property-user/property-user.component";
import { PropertyRoleComponent } from "./views/settings/property-role/property-role.component";
import {
  PlaceOrderDialog,
  VendorListComponent,
} from "./views/components/vendor-list/vendor-list.component";
import { ToastrModule } from "ngx-toastr";
import { VendorDialog } from "./views/components/vendor-list/vendor-list.component";
import { ClickStopPropagation } from "./common/directives/click-stop-prop.directive";
import { PropertyMainComponent } from "./views/components/property-main/property-main.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { PropertyFlowComponent } from "./views/components/property-main/property-flow/property-flow.component";
import { OrdersComponent } from "./views/components/orders/orders.component";
import { OccupancyViewComponent } from "./views/occupancy-view/occupancy-view.component";
import {
  OccupancyDetailsComponent,
  OccupancyDialog,
} from "./views/occupancy-details/occupancy-details.component";

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    SignupComponent,
    LoginComponent,
    PropertyComponent,
    BasicpropertyComponent,
    AdvancepropertyComponent,
    SingleoccupancyComponent,
    PriceComponent,
    DoubleComponent,
    SharedComponent,
    DialogComponent,
    DialogTemplateComponent,
    GuestListComponent,
    GuestDialog,
    ClickStopPropagation,
    VendorDialog,
    VendorListComponent,
    ResetPasswordComponent,
    FilterPipe,
    PlaceOrderDialog,
    SettingsComponent,
    PropertySettingsComponent,
    PropertyUserComponent,
    PropertyRoleComponent,
    PropertyMainComponent,
    DashboardComponent,
    PropertyFlowComponent,
    OrdersComponent,
    OccupancyViewComponent,
    OccupancyDetailsComponent,
    OccupancyDialog,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
      positionClass: "toast-top-right",
    }),
    MatIconModule,
    MatDividerModule,
  ],
  providers: [CommmonService, DialogService, appConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
