import { Injectable, Injector } from '@angular/core';
import { AuthService } from './common/services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { appConfig } from './AppConfig/appConfig';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private injector: Injector, private appConfig: appConfig) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiService: AuthService = this.injector.get(AuthService);
    if (
      request.url.indexOf('config.json') === -1 &&
      request.url.indexOf('/assets') === -1
    ) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Pragma', 'no-cache');
      if (request.body instanceof FormData) {
        // headers = headers.append('x-api-key', this.appConfig.authkey);
      } else {
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', 'application/json');
        //headers = headers.append('x-api-key', this.appConfig.authkey);
      }
      const Url: string = apiService.getApiUrl(request.url);
      request = request.clone({
        url: Url,
        headers,
      });
    }
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (event.status === 200) {
              if (
                event.body['error'] &&
                event.body['errorCode'] &&
                event.body['errorCode'] === 401
              ) {
                alert(event.body['error']);
              }
            }
          }
          return event;
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
          }
        }
      )
    );
  }
}
