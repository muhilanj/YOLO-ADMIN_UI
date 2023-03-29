import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./views/components/login/login.component";
import { SignupComponent } from "./views/components/signup/signup.component";
import { PropertyComponent } from "./views/property/property.component";
import { AppNavComponent } from "./views/components/app-nav/app-nav.component";
import { BasicpropertyComponent } from "./views/basicproperty/basicproperty.component";
import { AdvancepropertyComponent } from "./views/advanceproperty/advanceproperty.component";
import { SingleoccupancyComponent } from "./views/singleoccupancy/singleoccupancy.component";
import { PriceComponent } from "./views/price/price.component";
import { DoubleComponent } from "./views/double/double.component";
import { SharedComponent } from "./views/shared/shared.component";
import { GuestListComponent } from "./views/components/guest-list/guest-list.component";
import { ResetPasswordComponent } from "./views/components/reset-password/reset-password.component";
import { SettingsComponent } from "./views/settings/settings.component";
import { PropertySettingsComponent } from "./views/settings/property-settings/property-settings.component";
import { PropertyUserComponent } from "./views/settings/property-user/property-user.component";
import { PropertyRoleComponent } from "./views/settings/property-role/property-role.component";
import { VendorListComponent } from "./views/components/vendor-list/vendor-list.component";
import { PropertyMainComponent } from "./views/components/property-main/property-main.component";
import { PropertyFlowComponent } from "./views/components/property-main/property-flow/property-flow.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { OrdersComponent } from "./views/components/orders/orders.component";
import { OccupancyViewComponent } from "./views/occupancy-view/occupancy-view.component";
import { OccupancyDetailsComponent } from "./views/occupancy-details/occupancy-details.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "home",
    component: AppNavComponent,
  },
  {
    path: "property-main",
    component: PropertyMainComponent,
  },
  {
    path: "property",
    component: PropertyComponent,
  },
  {
    path: "basicproperty",
    component: BasicpropertyComponent,
  },
  {
    path: "sin",
    component: OccupancyViewComponent,
  },
  {
    path: "advanceproperty",
    component: AdvancepropertyComponent,
  },
  {
    path: "single",
    component: SingleoccupancyComponent,
  },
  {
    path: "double",
    component: DoubleComponent,
  },
  {
    path: "shared",
    component: SharedComponent,
  },
  {
    path: "price",
    component: PriceComponent,
  },
  {
    path: "guest-list",
    component: GuestListComponent,
  },
  {
    path: "vendor-list",
    component: VendorListComponent,
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "property-settings",
    component: PropertySettingsComponent,
  },
  {
    path: "property-user",
    component: PropertyUserComponent,
  },
  {
    path: "property-role",
    component: PropertyRoleComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "property-flow",
    component: PropertyFlowComponent,
  },
  {
    path: "orders",
    component: OrdersComponent,
  },
  {
    path: "occupancy",
    component: OccupancyDetailsComponent,
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
