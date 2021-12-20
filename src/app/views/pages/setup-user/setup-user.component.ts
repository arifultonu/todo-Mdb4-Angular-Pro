import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { SetupService } from 'src/app/services/data/todo/setup.service';


export class NewUserRow {
  public constructor(
    public id: number,
    public priorityName: string,
    public email: string,
    public name: string,
    public password: string,
    public username: string,
  ) {

  }
}

export interface User {
   id: number,
   priorityName: string,
   email: string,
   name: string,
   password: string,
   username: string,
}

@Component({
  selector: 'app-setup-user',
  templateUrl: './setup-user.component.html',
  styleUrls: ['./setup-user.component.scss']
})

export class SetupUserComponent implements OnInit {
  @Input() shadows = true;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: User[] = [];
  user: User[] = [];

  userRow: NewUserRow;

  modalRef: MDBModalRef;
  parameters: any = new Parameters();
  map: any;
  searchText: string = '';
  previous: string;
  modalLoading: boolean = true;

  userForm: FormGroup;

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
    this.userForm = new FormGroup({
      'searchText': new FormControl(),
    });

    this.getAllUser();
    this.userRow = new NewUserRow(this.id, '', '', '', '', '');
  }



  //////////User/////////////////

  getAllUser() {
    this.setupService.getAllUser().subscribe(data => {
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

  deleteUser(id: any) {
    console.log(`delete User ${id}`);
    this.setupService.deleteUser(id).subscribe(
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

  addNewUser() {
    this.setupService.addNewUser(this.userRow).subscribe(
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

  update(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.elements[id][property] = editField;
    console.log(this.elements);
    this.user = this.elements;
    this.updateUserService(this.user);
  }

  changeValue(id: number, property: any, event: any) {
    this.editField = event.target.textContent;
  }

  updateUserService(paramBody) {
    this.setupService.updateAllUser(paramBody).subscribe(
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

