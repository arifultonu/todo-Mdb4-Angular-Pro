import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class OutgoingSwiftMessageService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllOutgoingSwiftMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getAllOutgoingSwiftMessage`, params)
    .pipe(catchError(this.handleError));
  }

  getMtWiseOutgoingSwiftMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getMtWiseOutgoingSwiftMessage`, params)
    .pipe(catchError(this.handleError));
  }

  getOutgoingSwiftMessageByDocNoService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getAllOutgoingSwiftMessageByDocNo`, params)
    .pipe(catchError(this.handleError));
  }

  checkOutgoingSwiftMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/checkOutgoingSwiftMessage`, params)
    .pipe(catchError(this.handleError));
  }

  updateRowOutgoingSwiftMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/updateRowOutgoingSwiftMessage`, params)
    .pipe(catchError(this.handleError));
  }

  updateOutgoingSwiftMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/updateOutgoingSwiftMessage`, params)
    .pipe(catchError(this.handleError));
  }

  sendToAuthorizationService(dataTables: any): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/outgoingMessageSubmitToAuthorization`, dataTables)
    .pipe(catchError(this.handleError));
  }

  noOfCbsFlag1Service(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getNoOfCbsFlag1OutgoingSwiftMessageByDocNo`, params)
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
