import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { appConfig } from '../../AppConfig/appConfig';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': localStorage.getItem('token')
//   })
// };

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CommmonService {
  
  private showLoginFormSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private config: appConfig) {
    this.showLoginFormSubject = new BehaviorSubject({});
  }

  setShowLoginForm(show: any) {
    this.showLoginFormSubject.next(show);
  }

  getShowLoginForm(): Observable<any> {
    return this.showLoginFormSubject.asObservable();
  }
 

  public getAPI(url: string): Observable<any> {
    url = this.config.apiUrl + url;
    // console.log(url);
    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );

    return this.http
      .get(url, httpOptions)
      .pipe(retry(0), catchError(this.handleError.bind(this)));
  }

  public getAPIWithParams(url: string, params: HttpParams): Observable<any> {
    url = this.config.apiUrl + url;
    // console.log(url);
    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );

    return this.http
      .get(url, {
        headers: httpOptions.headers, 
        params
      })
      .pipe(retry(0), catchError(this.handleError.bind(this)));
  }

  public postAPI(url: string, data: any): Observable<any> {
    debugger;
    url = this.config.apiUrl + url;
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');
    // httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    // httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError.bind(this))
      // catchError(error => {
      //   if (error.status === 401 || error.status === 403) {
      //     this.handleError.bind(this);
      //   }
      //   return throwError(error);
      // })
    );
  }
  public putAPI(url: string, data: any): Observable<any> {
    debugger;
    url = this.config.apiUrl + url;
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');
    // httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    // httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    return this.http.put(url, data, httpOptions).pipe(
      catchError(this.handleError.bind(this))
      // catchError(error => {
      //   if (error.status === 401 || error.status === 403) {
      //     this.handleError.bind(this);
      //   }
      //   return throwError(error);
      // })
    );
  }

  handleError(error: any) {
    console.log(error);
    let errorMessage = '';
    if (error.status != null && error.status == '401') {
      errorMessage = 'Unauthorized';
    } else {
      if (
        error.error != null &&
        error.error.message != null &&
        error.error.message != ''
      ) {
        errorMessage = error.error.message;
      } else {
        if (error.error != null && error.error.error_description != null) {
          errorMessage = error.error.error_description;
        } else {
          if (error.error instanceof ErrorEvent) {
            errorMessage = 'Error: ${error.error.message}';
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
      }
    }

    if (errorMessage == 'Unauthorized') {
      localStorage.setItem('isAuth', 'false');
    }

    return throwError(errorMessage);

    // }, this.common.time_out_delay);
  }
}
