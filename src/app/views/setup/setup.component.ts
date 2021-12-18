
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';

export interface User {
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
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})


export class SetupComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;  
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: User[] = [];
  
  parameters: any = new Parameters();
  map: any;
  searchText: string = '';
  previous: string;
  modalLoading: boolean = true;

  userForm: FormGroup;
  maxVisibleItems: number = 5;
  visible = false;
  editField: string;
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,    
    private toastrService: ToastService,
    private datePipe: DatePipe,
    private modalService: MDBModalService,
  ) {
   }

   @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }


  ngOnInit() {
    this.userForm = new FormGroup({
      'searchText': new FormControl(),
    }); 
  }



  
getAllTaskByUserIdService() {
    const adminUserId = "2";
    // this.userId = sessionStorage.getItem("userId");
    console.log("this.adminUserId: " + adminUserId);
    // this.dashboardService.getAllTaskByUserIdService(adminUserId).subscribe(data => {
    //   this.map = data;
    //   this.elements = this.map;
    //   console.log(this.elements);
    //   if (this.elements.length > 0) {
        
    //     this.mdbTable.setDataSource(this.elements);
    //     this.elements = this.mdbTable.getDataSource();
    //     this.previous = this.mdbTable.getDataSource();

    //     this.modalLoading = false;
    //   } else {        
    //     this.modalLoading = false;
    //   }
    // },
    //  (error: any) => {
    //     console.log(error);
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
    //     this.toastrService.clear();
    //     this.toastrService.error(error, 'Sorry!', options);
    //   });
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
 


  updateTask(paramBody){
    // this.dashboardService.updateTask(paramBody).subscribe(
    //   data => {
    //     this.map = data;
    //     console.log(data);
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };       
    //   }, (error: any) => {
    //     console.log(error);
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
    //     this.toastrService.clear();
    //     this.toastrService.error(error, 'Sorry!', options);
    //   }
    // );

  }


  updateList(id: number, property: string, event: any) {
    // const editField = event.target.textContent;
    // this.elements[id][property] = editField;
    // console.log(this.elements);
    // this.todo = this.elements;
    // this.updateTask(this.todo);
  }

  changeValue(id: number, property: any, event: any) {
    this.editField = event.target.textContent;
  }
 

  deleteTask(id: any) {
    console.log(`delete todo ${id}`);
    // this.dashboardService.deleteTask(id).subscribe(
    //   data => {
    //     this.map = data;
    //     console.log(data);
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
    //     this.toastrService.clear();
    //     this.toastrService.success(this.map.responseMessage, 'Success!', options);
    //     this.ngOnInit();
    //   }, (error: any) => {
    //     console.log(error);
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
    //     this.toastrService.clear();
    //     this.toastrService.error(error, 'Sorry!', options);
    //   }
    // );

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




  showLoader(event: any) {
    if ( event.target.nativeElement.children[0].children[0].classList.contains('check')) {
    this.visible = true;
    window.setTimeout(() => {
      this.visible = false;
    }, 2000);
  }
  }
}
