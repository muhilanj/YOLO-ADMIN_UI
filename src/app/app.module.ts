import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './views/components/app-nav/app-nav.component';
import { SignupComponent } from './views/components/signup/signup.component';
import { LoginComponent } from './views/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyComponent } from './views/property/property.component';
import { MaterialModule } from './views/property/material.module';
import { appConfig } from './AppConfig/appConfig';
import { CommmonService } from './views/services/common.service';
import { Chart, ChartModule } from 'angular-highcharts';
import {MatExpansionModule} from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import { BasicpropertyComponent } from './views/basicproperty/basicproperty.component';
import { AdvancepropertyComponent } from './views/advanceproperty/advanceproperty.component';
import { SingleoccupancyComponent } from './views/singleoccupancy/singleoccupancy.component';
import { PriceComponent } from './views/price/price.component';
import { DoubleComponent } from './views/double/double.component';
import { SharedComponent } from './views/shared/shared.component';
import { DialogService } from './views/services/dialog.service';
import { DialogComponent } from './views/dialog/dialog.component';
import { DialogTemplateComponent } from './views/dialog-template/dialog-template.component';
import { RoleListComponent } from './views/components/role-list/role-list.component';
import { FilterPipe } from './common/filter.pipe';
import { ResetPasswordComponent } from './views/components/reset-password/reset-password.component';
import { SettingsComponent } from './views/settings/settings.component';
import { PropertySettingsComponent } from './views/settings/property-settings/property-settings.component';
import { PropertyUserComponent } from './views/settings/property-user/property-user.component';
import { PropertyRoleComponent } from './views/settings/property-role/property-role.component';
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
    RoleListComponent,
    ResetPasswordComponent,
    FilterPipe,
    SettingsComponent,
    PropertySettingsComponent,
    PropertyUserComponent,
    PropertyRoleComponent
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
  ],
  providers: [
    CommmonService,
    DialogService,
    appConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
