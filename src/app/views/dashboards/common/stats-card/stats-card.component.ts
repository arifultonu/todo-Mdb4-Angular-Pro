import { Component, ElementRef, Input, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { MDBModalRef, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface Todo {
  id: number,
  assignUserId: string,
  taskId: string,
  taskDetails: string,
  assignDate: Date,
  dueDate: Date,
  priorityId: string,
  taskStatusId: String,

}


@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})




export class StatsCardComponent implements OnInit {
  @Input() shadows = true;
  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: Todo[] = [];
  modalRef: MDBModalRef;

  parameters: any = new Parameters();
  map: any;
  searchText: string = '';
  previous: string;
  modalLoading: boolean = true;
  totalOpenTask: any;
  totalPendingTask: any;
  totalInProgressTask: any;
  totalCompletedTask: any;
  totalInReviewTask: any;
  totalRejectedTask: any;
  adminUserId: string;
  maxVisibleItems: number = 10;

  statsCardForm: FormGroup;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private toastrService: ToastService,
    private datePipe:DatePipe
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  //Data Table//

  ngOnInit() {
    this.statsCardForm = new FormGroup({
      'searchText': new FormControl(),
    });
    this.getAllTaskByUserIdService(); 

  }

  prevent(event) {
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    //Data Table
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    //Data Table//
  }

  getAllTaskByUserIdService() {
    const adminUserId = "2";
    // this.userId = sessionStorage.getItem("userId");
    console.log("this.adminUserId: " + adminUserId);
    this.dashboardService.getAllTaskByUserIdService(adminUserId).subscribe(data => {
      this.map = data;
      this.elements = this.map;
      console.log(this.elements);
      console.log(this.map);
      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.modalLoading = false;
      } else {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found !!', 'Sorry!', options);
        this.modalLoading = false;
      }
    },
      (error: any) => {
        console.log(error);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.error(error, 'Sorry!', options);
      });

  }


  // deleteTask(el: any) {
  //   const elementIndex = this.elements.findIndex((elem: any) => el === elem);
  //   this.mdbTable.removeRow(elementIndex);
  //   this.mdbTable.getDataSource().forEach((el: any, index: any) => {
  //     el.id = (index + 1).toString();
  //   });
  //   this.mdbTable.setDataSource(this.elements);

  // this.dashboardService.deleteTask(el.id).subscribe (
  //     data => {
  //       const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
  //       this.toastrService.clear(); 
  //       this.toastrService.success( `Delete of Task: ${el.id} , Successful!`, 'Success!', options);
  //       this.ngOnInit();
  //     }



  // }



  deleteTask(id: any){
    console.log(`delete todo ${id}` );
    this.dashboardService.deleteTask(id).subscribe (
      data => {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.clear(); 
        this.toastrService.success( `Delete of Task: ${id} , Successful!`, 'Success!', options);
        this.ngOnInit();
      }
      // ,(error: any) => {
      //   console.log(error);
      //   const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      //   this.toastrService.clear();
      //   this.toastrService.error(error, 'Sorry!', options);
      // }
      );
    
  }







  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }



  // getAllOpenTaskService() {
  //   this.parameters.branchCode = "003"; 
  //   this.dashboardService.getAllOpenTaskService(this.parameters).subscribe(data => {
  //     this.map = data;     
  //     console.log(this.map.totalOutgoingMessage);
  //     this.totalOutgoingMsg = this.map.totalOutgoingMessageNo;
  //     console.log(this.totalOutgoingMsg);
  //   });
  // }

  // getAllPendingTaskService() {
  //   this.parameters.branchCode = "003"; 
  //   this.dashboardService.getAllPendingTaskService(this.parameters).subscribe(data => {
  //     this.map = data;     
  //     console.log(this.map.totalOutgoingMessage);
  //     this.totalOutgoingMsg = this.map.totalOutgoingMessageNo;
  //     console.log(this.totalOutgoingMsg);
  //   });
  // }



  viewDetails(taskId: any) {

  }





}
