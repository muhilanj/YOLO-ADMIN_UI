import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): any {
    const auth: any = sessionStorage.getItem("userData");
    // Check whether the token is expired and return
    // true or false
    return auth;
  }
}
