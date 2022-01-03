
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef, MdbTableDirective, MdbTablePaginationComponent, ToastService } from "ng-uikit-pro-standard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';
import { Todo } from '../stats-card/stats-card.component';


export interface Comment {
  id: number,
  assignUserId: string,
  taskId: string,
  comments: string,
  
}



@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss']
})



export class TaskEditModalComponent implements OnInit {
  @Input() shadows = true;
  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;  
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: Comment[] = [];

  searchText: string = '';
  previous: string;

  parameters: any = new Parameters();
  map: any;
  maxVisibleItems: number = 5;
  modalLoading: boolean = true;
  
  public editableRow: { taskDetails: string, taskStatusId: string, id: string, assignUserId: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', readonly: true }),
    assignUserId: new FormControl({ value: '', readonly: true }),
  });

  constructor(
    public modalRef: MDBModalRef,
    private dashboardService: DashboardService,
    private toastrService: ToastService
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }


  ngOnInit() {
    this.form.controls['id'].patchValue(this.editableRow.id);
    this.form.controls['assignUserId'].patchValue(this.editableRow.assignUserId);
    
    this.form = new FormGroup({
      'comments': new FormControl(),

    })
  }


  getAllCommentsByTaskIdService() {
    this.dashboardService.getAllCommentsByTaskIdService(this.editableRow.id).subscribe(data => {
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




  submitComment() {
    const formValue = this.form.value;
    this.parameters.taskId = this.editableRow.id;
    this.parameters.assignUserId = this.editableRow.assignUserId;
    this.parameters.comments = formValue.comments;

    console.log("formValue.id: " + this.editableRow.id);
    console.log("formValue.assignUserId: " + this.editableRow.assignUserId);
    console.log("formValue.comments: " + formValue.comments);

    this.dashboardService.addComment(this.parameters).subscribe(data => {
      this.map = data;
      console.log(data);
      const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.success('', 'Done!', options);
    }, (error: any) => {
      console.log(error);
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error('', 'Failed!', options);
    }
    );
  }


  get comments() { return this.form.get('comments'); }

}

