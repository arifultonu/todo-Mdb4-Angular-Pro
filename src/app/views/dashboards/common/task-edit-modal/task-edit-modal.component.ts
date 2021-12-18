
import { Component, OnInit } from '@angular/core';
import { MDBModalRef, ToastService } from "ng-uikit-pro-standard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss']
})

export class TaskEditModalComponent implements OnInit {
  parameters: any = new Parameters();
  map: any;
  public editableRow: { taskDetails: string, taskStatusId: string, comment: string};
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    comment: new FormControl({ value: '', readonly: true }),
  });

  constructor(
    public modalRef: MDBModalRef,
    private dashboardService: DashboardService,
    private toastrService: ToastService
  ) { }

  ngOnInit() {
    this.form.controls['comment'].patchValue(this.editableRow.comment);
  }

  editRow() {
    const formValue = this.form.value;
    this.parameters.comment = formValue.comment;
   

    // this.dashboardService.getCbsMessageContentCheckService(this.parameters).subscribe(data => {
    //   this.map = data;
    //   console.log('sourceData: ' + this.map.sourceData);
    //   console.log('sourceFlag: ' + this.map.sourceFlag);

    //   if (this.map.sourceFlag == 'N') {
    //     this.cbsDataMessageService.updateCbsMessageDataService(this.parameters).subscribe(data => {
    //       this.map = data;
    //       console.log('referenceId: ' + this.map.referenceId);
    //       console.log('cbsValue: ' + this.map.cbsValue);

    //       const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
    //       this.toastrService.success('Validation Successfully!', '', options);

    //       if (this.map.referenceId == 'N') {
    //         this.editableRow = this.form.getRawValue();
    //         this.saveButtonClicked.next(this.editableRow);
    //         this.modalRef.hide();

    //         const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
    //         this.toastrService.success('Update Successfully!', '', options);

    //       } else if (this.map.referenceId == 'Y') {
    //         //Toast Message -- cbsValue
    //         const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
    //         this.toastrService.error(this.map.cbsValue, 'Update Failed!', options);
    //       }
    //     });
    //   } else if (this.map.sourceFlag == 'Y') {
    //     //Toast Message --sourceData
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
    //     this.toastrService.error(this.map.sourceData, 'Validation Failed!', options);
    //   }

    // });

  }

  //get promts() { return this.form.get('promts'); }
  get comment() { return this.form.get('comment'); }

}

