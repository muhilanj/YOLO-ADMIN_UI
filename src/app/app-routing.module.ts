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
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";
import { PartnerListComponent } from './views/components/partner-list/partner-list.component'; 
import { EditbasicpropertyComponent } from './views/editbasicproperty/editbasicproperty.component'; 
import { ContactusComponent } from './views/components/contactus/contactus.component'; 
import { SkuListComponent } from './views/settings/sku-list/sku-list.component';
import { AddskuComponent } from './views/settings/addsku/addsku.component';  

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
    canActivate: [AuthGuard],
  },
  {
    path: "property-main",
    component: PropertyMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "property",
    component: PropertyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "basicproperty",
    component: BasicpropertyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "sin",
    component: OccupancyViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "advanceproperty",
    component: AdvancepropertyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "single",
    component: SingleoccupancyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "double",
    component: DoubleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "shared",
    component: SharedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "price",
    component: PriceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "guest-list",
    component: GuestListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "vendor-list",
    component: VendorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "property-settings",
    component: PropertySettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "property-user",
    component: PropertyUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "property-role",
    component: PropertyRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "property-flow",
    component: PropertyFlowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "occupancy",
    component: OccupancyDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:"partner-list",
    component:PartnerListComponent,
    canActivate:[AuthGuard],
  },
  {
    path:"edit-property",
    component:EditbasicpropertyComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"contact-us",
    component:ContactusComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"sku-list",
    component:SkuListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"add-sku",
    component:AddskuComponent,
    canActivate:[AuthGuard]
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
