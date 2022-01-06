import { Component, ElementRef, Input, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { IMyOptions, MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SelectCodeNameList } from 'src/app/app.component';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';

export class NewTaskRow {
  public constructor(
    public id: number,
    public adminUserId: string,
    public assignUserId: string,
    public taskId: string,
    public taskDetails: string,
    public assignDate: string,
    public dueDate: string,
    public priorityId: string,
    public taskStatusId: String
  ) {

  }
}

export interface Todo {
  id: number,
  assignUserId: string,
  taskId: string,
  taskDetails: string,
  assignDate: string,
  dueDate: string,
  priorityId: string,
  taskStatusId: String,
}

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss']
})

export class TaskReportComponent implements OnInit {
  @Input() shadows = true;
  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  // @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: Todo[] = [];
  todo: Todo[] = [];

  taskrow: NewTaskRow;

  modalRef: MDBModalRef;
  allUserListSelect: SelectCodeNameList[] = [];
  allPriorityListSelect: SelectCodeNameList[] = [];
  allStatusListSelect: SelectCodeNameList[] = [];

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
  maxVisibleItems: number = 5000;

  statsCardForm: FormGroup;
  editField: string;
  id: number = 0;
  visible = false;

  userId: any;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private toastrService: ToastService,
    private datePipe: DatePipe,
    private modalService: MDBModalService,
    private jwtAuthenticationService: JwtAuthenticationService,
  ) { }

  @HostListener('input') oninput() {
    // this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.userId = this.jwtAuthenticationService.userId;
    console.log("const userId: " + this.userId);

    this.getAllTaskByUserIdService();
    this.getAllUserDataList();
    this.getAllPriorityDataList();
    this.getAllStatusDataList();
  }

  public myDatePickerOptions: IMyOptions = {
    // Your options
  };

  getAllStatusDataList() {
    this.dashboardService.getAllStatusDataService().subscribe(data => {
      this.map = data;
      this.allStatusListSelect = this.map.allStatusDataList;
    }, (error: any) => {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error(error, 'Sorry!', options);
    });
  }

  getAllPriorityDataList() {
    this.dashboardService.getAllPriorityDataService().subscribe(data => {
      this.map = data;
      this.allPriorityListSelect = this.map.allPriorityDataList;
    }, (error: any) => {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error(error, 'Sorry!', options);
    });
  }

  getAllUserDataList() {
    this.dashboardService.getAllUserDataListService().subscribe(data => {
      this.map = data;
      this.allUserListSelect = this.map.allUserDataList;
    }, (error: any) => {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error(error, 'Sorry!', options);
    });
  }

  getAllTaskByUserIdService() {
    console.log("this.adminUserId: " + this.userId);
    this.dashboardService.getAllTaskByUserIdService(this.userId).subscribe(data => {
      this.map = data;
      this.elements = this.map;
      console.log(this.elements);
      if (this.elements.length > 0) {

        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();

        this.modalLoading = false;
      } else {
        this.modalLoading = false;
      }
    }, (error: any) => {
      console.log(error);
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error(error, 'Sorry!', options);
    });
  }

  prevent(event) {
    event.preventDefault();
  }

  printPreview() {
    window.print();
  
  }

  

  ngAfterViewInit(): void {
   
    this.cdRef.detectChanges();
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
 
    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
     
    });
  }


}


