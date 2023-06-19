import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig  } from 'src/app/AppConfig/appConfig';
import { HttpClient } from '@angular/common/http';
import { FormatString } from '../formatString';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private appConfig:appConfig,
    private http:HttpClient
  ) { }


  getApiUrl(apiMethods: string): string {
    return this.appConfig.apiUrl + apiMethods;
  }

  public AdminLogin(admindata:any): Observable<any> {
    return this.http.post(this.appConfig.login, admindata)

  }
  
}
