import { JPA_API_URL } from '../../app.constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Parameters } from 'src/app/parameters';
import { catchError } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUserId';
export const AUTHENTICATED_NAME = 'authenticaterUserName';

@Injectable({
  providedIn: 'root'
})

export class JwtAuthenticationService {
  constructor(
    private http: HttpClient
  ) {}

  tokenVal = '';
  userId = '';
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
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
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


  // executeJWTAuthenticationService(username: any, password: any) {
  //   return this.http.post<any>(`${JPA_API_URL}/authenticate`,
  //   {
  //     username,
  //     password
  //   }).pipe(
  //     map(
  //       data => {
  //         console.log(data);
  //         this.tokenVal = `${data.token}`;
  //         if(this.tokenVal.length > 0){
  //           console.log("this.tokenVal: "+this.tokenVal);
  //           // this.userName = `${data.map.userMaster.userName}`;
  //           // this.designation = `${data.map.userMaster.designation}`;
  //           // this.companyName = `${data.map.companyObj.compname}`;
  //           // this.branchName = `${data.map.branchObj.branname}`;
  //           // console.log(this.userName + ' - ' + this.designation);
  //           sessionStorage.setItem('authenticaterUserId', username);
  //           sessionStorage.setItem('authenticaterUserName', this.userName);
  //           // sessionStorage.setItem('authenticaterUserDesignation', this.designation);
  //           // sessionStorage.setItem('companyCode', `${data.map.userMaster.compCode}`);
  //           // sessionStorage.setItem('companyName', `${data.map.companyObj.compname}`);
  //           // sessionStorage.setItem('branchName', `${data.map.branchObj.branname}`);
  //           // sessionStorage.setItem('userGroupCode', `${data.map.userMaster.userGroupCode}`);
  //           this.userId = username;
  //           sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
  //           // sessionStorage.setItem(SESSIONID, `${data.map.sessionId}`);
  //           sessionStorage.setItem(AUTHENTICATED_ID, username);
  //           sessionStorage.setItem(AUTHENTICATED_NAME, this.userName);
  //           // sessionStorage.setItem(AUTHENTICATED_DESIGNATION, this.designation);
  //           // sessionStorage.setItem('checkMenu', '');
            
  //           return data;
  //         }else{
  //           //sessionStorage.setItem(TOKEN, '');
  //           return data;
  //         }
  //       }
  //     )
  //   );
  // }

  
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

}

export class AuthenticationBean{
  constructor(public message:string) { }
}