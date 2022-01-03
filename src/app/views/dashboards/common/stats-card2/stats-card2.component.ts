import { Component, ElementRef, Input, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SelectCodeNameList } from 'src/app/app.component';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';
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
  ){ 

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
  selector: 'app-stats-card2',
  templateUrl: './stats-card2.component.html',
  styleUrls: ['./stats-card2.component.scss']
})

export class StatsCard2Component implements OnInit {
  @Input() shadows = true;
  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;  
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
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
  maxVisibleItems: number = 5;

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
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.userId = this.jwtAuthenticationService.userId;

    this.statsCardForm = new FormGroup({
      'searchText': new FormControl(),
    });    
    this.getAllTaskByUserIdService();
    this.getAllUserDataList();
    this.getAllPriorityDataList();
    this.getAllStatusDataList();
    this.taskrow = new NewTaskRow(this.id, this.userId,'','','','YYYY/MM/DD','YYYY/MM/DD','','');
  }

  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
   this.modalRef = this.modalService.show(TaskEditModalComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
    });
    this.mdbTable.setDataSource(this.elements);
  }

  
getAllTaskByUserIdService() {
    this.dashboardService.getAllTaskByAssignUserIdService(this.userId).subscribe(data => {
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


  addNewTask() {
      this.dashboardService.addNewTask(this.taskrow).subscribe(
        data => {
          this.map = data;
          console.log(data);
          const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };         
          this.ngOnInit();
        }, (error: any) => {
          console.log(error);
          const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
          this.toastrService.clear();
          this.toastrService.error(error, 'Sorry!', options);
        }
      );
    }

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

  prevent(event) {
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
 

  updateTask(paramBody){
    this.dashboardService.updateTask(paramBody).subscribe(
      data => {
        this.map = data;
        console.log(data);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.success(this.map.responseMessage, 'Success!', options);
      }, (error: any) => {
        console.log(error);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.error(error, 'Sorry!', options);
      }
    );

  }


  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.elements[id][property] = editField;
    console.log(this.elements);
    this.todo = this.elements;
    this.updateTask(this.todo);
  }

  changeValue(id: number, property: any, event: any) {
    this.editField = event.target.textContent;
  }
 

  deleteTask(id: any) {
    console.log(`delete todo ${id}`);
    this.dashboardService.deleteTask(id).subscribe(
      data => {
        this.map = data;
        console.log(data);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.success(this.map.responseMessage, 'Success!', options);
        this.ngOnInit();
      }, (error: any) => {
        console.log(error);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.error(error, 'Sorry!', options);
      }
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


}



