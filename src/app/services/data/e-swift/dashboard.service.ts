import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from 'src/app/views/dashboards/common/stats-card/stats-card.component';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTaskByUserIdService(adminUserId: String): Observable<any> {
    console.log("Service adminUserId: "+adminUserId );
    return this.httpClient.get<Todo[]>(`${JPA_API_URL}/todo/getAllTaskByUserId/${adminUserId}`)
    .pipe(catchError(this.handleError));
  }

  deleteTask(id: string){
    console.log("ID: "+ id);
    return this.httpClient.delete(`${JPA_API_URL}/todo/deleteTaskById/${id}`)
    .pipe(catchError(this.handleError));
  }

  getAllUserDataListService(){
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllUserSelectDataList`)
    .pipe(catchError(this.handleError));
  }

  getAllPriorityDataService(){
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllPrioritySelectDataList`)
    .pipe(catchError(this.handleError));
  }
  getAllStatusDataService(){
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllStatusSelectDataList`)
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
