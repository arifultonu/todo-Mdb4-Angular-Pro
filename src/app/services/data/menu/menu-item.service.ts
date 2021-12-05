import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JPA_API_URL } from 'src/app/app.constants';
import { Parameters } from 'src/app/parameters';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor(private http: HttpClient) { }

  getAllMenuItemList(params: Parameters){
    return this.http.post<any>(`${JPA_API_URL}/menuList`, params);
  }

}
