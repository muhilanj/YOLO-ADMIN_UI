import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from 'src/app/AppConfig/appConfig';
@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private appConfig: appConfig, private http: HttpClient) {}

  public propertyAdd(propertydata: any): Observable<any> {
    return this.http.post(this.appConfig.propertyAdd, propertydata);
  }
}
