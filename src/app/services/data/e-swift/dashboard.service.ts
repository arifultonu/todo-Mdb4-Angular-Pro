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
    console.log("Service adminUserId: " + adminUserId);
    return this.httpClient.get<Todo[]>(`${JPA_API_URL}/todo/getAllTaskByUserId/${adminUserId}`)
      .pipe(catchError(this.handleError));
  }

  getAllTaskByAssignUserIdService(assignUserId: String): Observable<any> {
    console.log("Service adminUserId: " + assignUserId);
    return this.httpClient.get<Todo[]>(`${JPA_API_URL}/todo/getAllTaskByAssignUserId/${assignUserId}`)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string) {
    console.log("ID: " + id);
    return this.httpClient.delete(`${JPA_API_URL}/todo/deleteTaskById/${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteCommentByTaskId(taskId: string) {
    console.log("ID: " + taskId);
    return this.httpClient.delete(`${JPA_API_URL}/todo/deleteCommentById/${taskId}`)
      .pipe(catchError(this.handleError));
  }

  getAllUserDataListService() {
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllUserSelectDataList`)
      .pipe(catchError(this.handleError));
  }

  getAllPriorityDataService() {
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllPrioritySelectDataList`)
      .pipe(catchError(this.handleError));
  }

  getAllStatusDataService() {
    return this.httpClient.get(`${JPA_API_URL}/todo/getAllStatusSelectDataList`)
      .pipe(catchError(this.handleError));
  }

  updateTask(paramBody) {
    return this.httpClient.put(`${JPA_API_URL}/todo/updateAllTaskAssign`, paramBody)
      .pipe(catchError(this.handleError));
  }

  addNewTask(paramBody) {
    return this.httpClient.post(`${JPA_API_URL}/todo/addTaskAssign`, paramBody)
      .pipe(catchError(this.handleError));
  }


//Comments Block//
  addComment(paramBody) {
    return this.httpClient.post(`${JPA_API_URL}/todo/addComment`, paramBody)
      .pipe(catchError(this.handleError));
  }

  getAllCommentsByTaskIdService(taskId: String): Observable<any> {
    return this.httpClient.get<Comment[]>(`${JPA_API_URL}/todo/getAllCommentsByTaskId/${taskId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is the problem with the Service');
  }

}
