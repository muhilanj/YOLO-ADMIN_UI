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
import { Interceptor } from './interceptor';
import { AuthService } from './common/services/auth.service';
import { appConfig } from './AppConfig/appConfig';
import { CommmonService } from './views/services/common.service';
import { Chart, ChartModule } from 'angular-highcharts';
import {MatExpansionModule} from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicpropertyComponent } from './views/basicproperty/basicproperty.component';
import { AdvancepropertyComponent } from './views/advanceproperty/advanceproperty.component';
import { SingleoccupancyComponent } from './views/singleoccupancy/singleoccupancy.component';
import { PriceComponent } from './views/price/price.component';
import { DoubleComponent } from './views/double/double.component';
import { SharedComponent } from './views/shared/shared.component';
import { DialogService } from './views/services/dialog.service';
import { DialogComponent } from './views/dialog/dialog.component';
import { DialogTemplateComponent } from './views/dialog-template/dialog-template.component';
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
    DialogTemplateComponent
  ],
  imports: [
    BrowserModule,
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
    // {
    //   /*API interceptor should invoked here to attach with all http request */
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true,
    // },
    appConfig,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (authService: AuthService) => () => authService.load(),
    //   deps: [AuthService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
