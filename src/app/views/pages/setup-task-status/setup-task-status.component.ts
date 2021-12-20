import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { SetupService } from 'src/app/services/data/todo/setup.service';


export class NewTaskStatusRow {
  public constructor(
    public priorityId: number,
    public priorityName: string,
  ) {

  }
}

export interface TaskStatus {
  priorityId: number,
  priorityName: string,
}

@Component({
  selector: 'app-setup-task-status',
  templateUrl: './setup-task-status.component.html',
  styleUrls: ['./setup-task-status.component.scss']
})

export class SetupTaskStatusComponent implements OnInit {
  @Input() shadows = true;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: TaskStatus[] = [];
  taskStatus: TaskStatus[] = [];

  taskStatusRow: NewTaskStatusRow;

  modalRef: MDBModalRef;
  parameters: any = new Parameters();
  map: any;
  searchText: string = '';
  previous: string;
  modalLoading: boolean = true;

  userForm: FormGroup;
  taskStatusForm: FormGroup;

  maxVisibleItems: number = 20;
  visible = false;
  editField: string;
  id: number = 0;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private toastrService: ToastService,
    private datePipe: DatePipe,
    private modalService: MDBModalService,
    private setupService: SetupService,
  ) {
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }


  ngOnInit() {
    this.taskStatusForm = new FormGroup({
      'searchText': new FormControl(),
    });

    this.getAllTaskStatus();
    this.taskStatusRow = new NewTaskStatusRow(this.id, '');
  }



  //////////Task Status/////////////////

  getAllTaskStatus() {
    this.setupService.getAllTaskStatus().subscribe(data => {
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

  deleteTaskStatus(id: any) {
    console.log(`delete TaskStatus ${id}`);
    this.setupService.deleteTaskStatus(id).subscribe(
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

  addNewTaskStatus() {
    this.setupService.addNewTaskStatus(this.taskStatusRow).subscribe(
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

  updateTaskStatus(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.elements[id][property] = editField;
    console.log(this.elements);
    this.taskStatus = this.elements;
    this.updateTaskStatusService(this.taskStatus);
  }

  changeValueTaskStatus(id: number, property: any, event: any) {
    this.editField = event.target.textContent;
  }

  updateTaskStatusService(paramBody) {
    this.setupService.updateAllTaskStatus(paramBody).subscribe(
      data => {
        this.map = data;
        console.log(data);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
      }, (error: any) => {
        console.log(error);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.error(error, 'Sorry!', options);
      }
    );

  }
  ////////////////////////////

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


  showLoader(event: any) {
    if (event.target.nativeElement.children[0].children[0].classList.contains('check')) {
      this.visible = true;
      window.setTimeout(() => {
        this.visible = false;
      }, 2000);
    }
  }

}
