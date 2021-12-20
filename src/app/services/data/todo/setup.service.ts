import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Priority, TaskStatus } from 'src/app/views/setup/setup.component';

@Injectable({
  providedIn: 'root'
})

export class SetupService {
  constructor(
    private httpClient: HttpClient,
  ) { 

  }

  //User Setup
  // getAllUser(adminUserId: String): Observable<any> {
  //   console.log("Service adminUserId: " + adminUserId);
  //   return this.httpClient.get<Users[]>(`${JPA_API_URL}/todo/getAllTaskByUserId/${adminUserId}`)
  //     .pipe(catchError(this.handleError));
  // }

  // deleteUser(id: string) {
  //   console.log("ID: " + id);
  //   return this.httpClient.delete(`${JPA_API_URL}/todo/deleteTaskById/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // updateUser(paramBody) {
  //   return this.httpClient.put(`${JPA_API_URL}/todo/updateAllTaskAssign`, paramBody)
  //     .pipe(catchError(this.handleError));
  // }

  //Priority Setup
  getAllPriority(): Observable<any> {
    return this.httpClient.get<Priority[]>(`${JPA_API_URL}/todo/getAllPriority/`)
      .pipe(catchError(this.handleError));
  }

  deletePriority(id: string) {
    console.log("ID: " + id);
    return this.httpClient.delete(`${JPA_API_URL}/todo/deletePriorityById/${id}`)
      .pipe(catchError(this.handleError));
  }

  updatePriority(paramBody) {
    return this.httpClient.put(`${JPA_API_URL}/todo/updateAllPriority`, paramBody)
      .pipe(catchError(this.handleError));
  }

  addNewPriority(paramBody) {
    return this.httpClient.post(`${JPA_API_URL}/todo/addPriority`, paramBody)
      .pipe(catchError(this.handleError));
  }

  //Task Status Setup
  getAllTaskStatus(adminUserId: String): Observable<any> {
    console.log("Service adminUserId: " + adminUserId);
    return this.httpClient.get<TaskStatus[]>(`${JPA_API_URL}/todo/getAllTaskStatus/${adminUserId}`)
      .pipe(catchError(this.handleError));
  }

  deleteTaskStatus(id: string) {
    console.log("ID: " + id);
    return this.httpClient.delete(`${JPA_API_URL}/todo/deleteTaskStatusById/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateTaskStatus(paramBody) {
    return this.httpClient.put(`${JPA_API_URL}/todo/updateTaskStatus`, paramBody)
      .pipe(catchError(this.handleError));
  }

  addNewTaskStatus(paramBody) {
    return this.httpClient.post(`${JPA_API_URL}/todo/addTaskStatus`, paramBody)
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
