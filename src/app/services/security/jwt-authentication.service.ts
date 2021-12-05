import { JPA_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

export const TOKEN = 'token';
export const SESSIONID = 'sessionid';
export const AUTHENTICATED_ID = 'authenticaterUserId';
export const AUTHENTICATED_NAME = 'authenticaterUserName';
export const AUTHENTICATED_DESIGNATION = 'authenticaterUserDesignation';

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

  executeJWTAuthenticationService(username: any, password: any) {
    return this.http.post<any>(`${JPA_API_URL}/authenticate`,
    {
      username,
      password
    }).pipe(
      map(
        data => {
          console.log(data);
          this.tokenVal = `${data.token}`;
          if(this.tokenVal.length > 0){
            // console.log(data.map.userMaster);
            this.userName = `${data.map.userMaster.userName}`;
            this.designation = `${data.map.userMaster.designation}`;
            this.companyName = `${data.map.companyObj.compname}`;
            this.branchName = `${data.map.branchObj.branname}`;
            // console.log(this.userName + ' - ' + this.designation);
            sessionStorage.setItem('authenticaterUserId', username);
            sessionStorage.setItem('authenticaterUserName', this.userName);
            sessionStorage.setItem('authenticaterUserDesignation', this.designation);
            sessionStorage.setItem('companyCode', `${data.map.userMaster.compCode}`);
            sessionStorage.setItem('companyName', `${data.map.companyObj.compname}`);
            sessionStorage.setItem('branchName', `${data.map.branchObj.branname}`);
            sessionStorage.setItem('userGroupCode', `${data.map.userMaster.userGroupCode}`);
            this.userId = username;
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            sessionStorage.setItem(SESSIONID, `${data.map.sessionId}`);
            sessionStorage.setItem(AUTHENTICATED_ID, username);
            sessionStorage.setItem(AUTHENTICATED_NAME, this.userName);
            sessionStorage.setItem(AUTHENTICATED_DESIGNATION, this.designation);
            sessionStorage.setItem('checkMenu', '');
            
            return data;
          }else{
            //sessionStorage.setItem(TOKEN, '');
            return data;
          }
        }
      )
    );
  }

  getAuthenticatedUser() {
    sessionStorage.setItem('checkMenu', '');
    return sessionStorage.getItem('authenticaterUserId');
  }

  getAuthenticatedToken(): any {
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem('token');
  }

  isUserLoggedIn() {
    let userId = sessionStorage.getItem('authenticaterUserId');
    let userName = sessionStorage.getItem('authenticaterUserName');
    let designation = sessionStorage.getItem('authenticaterUserDesignation');
    let companyName = sessionStorage.getItem('companyName');
    let branchName = sessionStorage.getItem('branchName');
    this.userName = userName;
    this.designation = designation;
    this.companyName = companyName;
    this.branchName = branchName;
    return !(userId === null && userName === null);
  }

  logOut() {
    sessionStorage.removeItem('authenticaterUserId');
    sessionStorage.removeItem('authenticaterUserName');
    sessionStorage.removeItem('authenticaterUserDesignation');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('sessionid');
    sessionStorage.removeItem('companyCode');
    sessionStorage.removeItem('checkMenu');
    sessionStorage.removeItem('userGroupCode');
    sessionStorage.removeItem('companyName');
    sessionStorage.removeItem('branchName');

  }

}

export class AuthenticationBean {
  constructor(public message: string) {
  }
}
