import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/components/login/login.component';
import { SignupComponent } from './views/components/signup/signup.component';
import { PropertyComponent } from './views/property/property.component';
import { AppNavComponent } from './views/components/app-nav/app-nav.component';
import { BasicpropertyComponent } from './views/basicproperty/basicproperty.component';
import { AdvancepropertyComponent } from './views/advanceproperty/advanceproperty.component';
import { SingleoccupancyComponent } from './views/singleoccupancy/singleoccupancy.component';
import { PriceComponent } from './views/price/price.component';
import { DoubleComponent } from './views/double/double.component';
import { SharedComponent } from './views/shared/shared.component';
import { VendorListComponent } from './views/components/vendor-list/vendor-list.component';
import { RoleListComponent } from './views/components/role-list/role-list.component';
import { ResetPasswordComponent } from './views/components/reset-password/reset-password.component';
import { SettingsComponent } from './views/settings/settings.component';
import { PropertySettingsComponent } from './views/settings/property-settings/property-settings.component';
import { PropertyUserComponent } from './views/settings/property-user/property-user.component';
import { PropertyRoleComponent } from './views/settings/property-role/property-role.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: AppNavComponent,
  },
  {
    path: 'property',
    component: PropertyComponent,
  },
  {
    path: 'basicproperty',
    component: BasicpropertyComponent,
  },
  {
    path: 'advanceproperty',
    component: AdvancepropertyComponent,
  },
  {
    path: 'single',
    component: SingleoccupancyComponent,
  },
  {
    path: 'double',
    component: DoubleComponent,
  },
  {
    path: 'shared',
    component: SharedComponent,
  },
  {
    path: 'price',
    component: PriceComponent,
  },
  {
    path: 'vendor-list',
    component: VendorListComponent,
  },
  {
    path: 'role-list',
    component: RoleListComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'property-settings',
    component: PropertySettingsComponent,
  },
  {
    path: 'property-user',
    component: PropertyUserComponent,
  },
  {
    path: 'property-role',
    component: PropertyRoleComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
