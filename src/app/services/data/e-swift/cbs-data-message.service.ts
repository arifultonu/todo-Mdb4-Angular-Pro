import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CbsDataMessageService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getMessageTypeDataService(): Observable<any> {
    console.log();
    return this.httpClient.get(`${JPA_API_URL}/e-swift/getMessageTypeList`)
    .pipe(catchError(this.handleError));
  }

  getPendingDocNoDataService(): Observable<any> {
    console.log();
    return this.httpClient.get(`${JPA_API_URL}/e-swift/getPendingDocumentNoList`)
    .pipe(catchError(this.handleError));
  }
 
  // getPendingDocNoDataService() {
  //   return this.httpClient.get(`${JPA_API_URL}/e-swift/getPendingDocumentNoList`);
  // }

  getCbsMessageDataListService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getCbsDataForMessageCreationList`, params)
    .pipe(catchError(this.handleError));
  }

  // getCbsMessageDataListService(params: Parameters) {
  //   return this.httpClient.post(`${JPA_API_URL}/e-swift/getCbsDataForMessageCreationList`, params);
  // }


  getCbsMessageContentCheckService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/cbsMessageContentCheck`, params)
    .pipe(catchError(this.handleError));
  }

  // getCbsMessageContentCheckService(params: Parameters) {
  //   return this.httpClient.post(`${JPA_API_URL}/e-swift/cbsMessageContentCheck`, params);
  // }

  updateCbsMessageDataService(dataTables: any): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/updateCbsMessageDataApi`, dataTables)
    .pipe(catchError(this.handleError));
  }

  // updateCbsMessageDataService(dataTables: any) {
  //   return this.httpClient.post(`${JPA_API_URL}/e-swift/updateCbsMessageDataApi`, dataTables);
  // }


 

  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
       return throwError('There is the problem with the Service');
  }




}
