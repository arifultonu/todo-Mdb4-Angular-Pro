
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuthenticationService } from '../security/jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntersepterBasicAuthService implements HttpInterceptor{

  constructor(
    private jwtAuthenticationService: JwtAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let jwtAuthHeaderString = this.jwtAuthenticationService.getAuthenticatedToken();
    let userName = this.jwtAuthenticationService.getAuthenticatedUser();

    if(jwtAuthHeaderString && userName){
      console.log(this.jwtAuthenticationService.getAuthenticatedUser());
    request = request.clone({
      setHeaders : {
        Authorization: jwtAuthHeaderString
      }
    })
  }
    return next.handle(request);
  }


}
