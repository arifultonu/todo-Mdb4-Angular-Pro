import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "projects/ng-uikit-pro-standard/src/public_api";

@Injectable({
    providedIn: 'root'
  })
  

export class AppCommons {
    formatedDate;
    sysDate = new Date(Date.now());
    dateParam: any;

    constructor(
        private httpClient: HttpClient,
        private datePipe: DatePipe,
    ){}
    
    
    getFormatedSysDate(dateParam: any) {
        this.formatedDate = this.datePipe.transform(dateParam, 'dd-MMM-yyyy');
        return this.formatedDate;
      }


      
}

