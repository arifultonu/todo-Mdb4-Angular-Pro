import { JPA_API_URL } from '../../app.constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Parameters } from 'src/app/parameters';
import { catchError } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER_ROLE = 'authenticaterUserRole';
export const AUTHENTICATED_USER_ID = 'authenticaterUserId';
export const AUTHENTICATED_USER_NAME = 'authenticaterUserName';
export const AUTHENTICATED_USER_FULL_NAME = 'authenticaterUserFullName';

@Injectable({
  providedIn: 'root'
})

export class JwtAuthenticationService {
  constructor(
    private http: HttpClient
  ) {}

  
  userId = '';
  userFullName = '';
  role = '';
  tokenVal = '';
  userName: any = '';
  designation: any = '';
  companyName: any = '';
  branchName: any = '';
  nodes: any = [];
  menuList: any = [];

  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Service');
  }

  executeJWTAuthenticationService(username: any, password: any) {    
    return this.http.post<any>(
      `${JPA_API_URL}/authenticate`,{username, password}).pipe(
        map(
          data => {
            console.log("role: "+`${data.role}`);
            sessionStorage.setItem(AUTHENTICATED_USER_ID, `${data.id}`);
            sessionStorage.setItem(AUTHENTICATED_USER_FULL_NAME, `${data.name}`);
            sessionStorage.setItem(AUTHENTICATED_USER_NAME, username);
            sessionStorage.setItem(AUTHENTICATED_USER_ROLE, `${data.role}`);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);            

            this.userName = username;
            this.userFullName = `${data.name}`;
            this.userId = `${data.id}`;
            this.role = `${data.role}`;
            return data;
          }
        )
      );
    console.log("Execute login")
  }


  userRegistrationService(param:any){
    return this.http.post(`${JPA_API_URL}/todo/addUser`, param)
    .pipe(catchError(this.handleError));
  }

  
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER_NAME)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let userName = sessionStorage.getItem(AUTHENTICATED_USER_NAME)
    return !(userName === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER_ID);
    sessionStorage.removeItem(AUTHENTICATED_USER_FULL_NAME);
    sessionStorage.removeItem(AUTHENTICATED_USER_NAME);
    sessionStorage.removeItem(AUTHENTICATED_USER_ROLE);
    sessionStorage.removeItem(TOKEN);           

  }

}

export class AuthenticationBean{
  constructor(public message:string) { }
}