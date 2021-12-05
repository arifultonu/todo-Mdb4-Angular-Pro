import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OutgoingMessageAuthorizationService {
  constructor(
    private httpClient: HttpClient
  ) { }


  getAllOutgoingAuthorizationMessageService(params: Parameters): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getAllOutgoingAuthorizationMessage`, params)
    .pipe(catchError(this.handleError));
  }

  getMtWiseOutgoingAuthorizationMessageService(params: Parameters): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getMtWiseOutgoingAuthorizationMessage`, params)
    .pipe(catchError(this.handleError));
  }

  getOutgoingAuthorizationMessageByDocNoService(params: Parameters): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getAllOutgoingAuthorizationMessageByDocNo`, params)
    .pipe(catchError(this.handleError));
  }

  checkOutgoingAuthorizationMessageService(params: Parameters): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/checkOutgoingAuthorizationMessage`, params)
    .pipe(catchError(this.handleError));
  }

  updateOutgoingAuthorizationMessageService(dataTables: any): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/updateOutgoingAuthorizationMessage`, dataTables)
    .pipe(catchError(this.handleError));
  }
  
  outgoingAuthorizaionMessageModifyService(dataTables: any): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/outgoingAuthorizationMessageModify`, dataTables)
    .pipe(catchError(this.handleError));
  }

  outgoingAuthorizaionMessageApproveService(dataTables: any): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/outgoingAuthorizationMessageApprove`, dataTables)
    .pipe(catchError(this.handleError));
  }
  
  outgoingAuthorizaionMessageApproveModifyService(dataTables: any): Observable<any> {
    return this.httpClient.post(`${JPA_API_URL}/e-swift/outgoingAuthorizaionMessageApproveModify`, dataTables)
    .pipe(catchError(this.handleError));
  }
  
  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Service');
  }


}
