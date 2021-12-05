import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getTotalNumberOfOutgoingMessageService(params: Parameters): Observable<any> {
    console.log();
    return this.httpClient.post(`${JPA_API_URL}/e-swift/getTotalNumberOfOutgoingMsg`, params)
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
