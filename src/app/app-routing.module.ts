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
