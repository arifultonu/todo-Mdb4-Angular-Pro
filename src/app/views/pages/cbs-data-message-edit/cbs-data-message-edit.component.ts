
import { Component } from '@angular/core';
import { MDBModalRef, ToastService } from "ng-uikit-pro-standard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { CbsDataMessageService } from 'src/app/services/data/e-swift/cbs-data-message.service';
import { Parameters } from 'src/app/parameters';

@Component({
  selector: 'app-cbs-data-message-edit',
  templateUrl: './cbs-data-message-edit.component.html',
  styleUrls: ['./cbs-data-message-edit.component.scss']
})
export class CbsDataMessageEditComponent {

  parameters: any = new Parameters();
  map: any;

  public editableRow: { messageType: string, cbsField: string, cbsValue: string, promts: string, documentNo: string, tagSerial: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    messageType: new FormControl({ value: '', readonly: true }),
    cbsField: new FormControl({ value: '', readonly: true }),
    cbsValue: new FormControl('', Validators.required),
    promts: new FormControl(''),
    documentNo: new FormControl(''),
    tagSerial: new FormControl(''),
  });



  constructor(
    public modalRef: MDBModalRef,
    private cbsDataMessageService: CbsDataMessageService,
    private toastrService: ToastService
  ) { }

  ngOnInit() {
    this.form.controls['messageType'].patchValue(this.editableRow.messageType);
    this.form.controls['cbsField'].patchValue(this.editableRow.cbsField);
    this.form.controls['cbsValue'].patchValue(this.editableRow.cbsValue)
    this.form.controls['promts'].patchValue(this.editableRow.promts)
    this.form.controls['documentNo'].patchValue(this.editableRow.documentNo)
    this.form.controls['tagSerial'].patchValue(this.editableRow.tagSerial)
  }

  editRow() {
    const formValue = this.form.value;
    this.parameters.messageType = formValue.messageType;
    this.parameters.cbsField = formValue.cbsField;
    this.parameters.cbsValue = formValue.cbsValue;
    this.parameters.documentNo = formValue.documentNo;

    console.log("parameters.documentNo:" + this.parameters.documentNo);
    console.log("parameters.messageType:" + this.parameters.messageType);
    console.log("parameters.promts:" + this.parameters.cbsField);
    console.log("parameters.cbsValue:" + this.parameters.cbsValue);

    this.cbsDataMessageService.getCbsMessageContentCheckService(this.parameters).subscribe(data => {
      this.map = data;
      console.log('sourceData: ' + this.map.sourceData);
      console.log('sourceFlag: ' + this.map.sourceFlag);

      if (this.map.sourceFlag == 'N') {
        this.cbsDataMessageService.updateCbsMessageDataService(this.parameters).subscribe(data => {
          this.map = data;
          console.log('referenceId: ' + this.map.referenceId);
          console.log('cbsValue: ' + this.map.cbsValue);

          const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
          this.toastrService.success('Validation Successfully!', '', options);

          if (this.map.referenceId == 'N') {
            this.editableRow = this.form.getRawValue();
            this.saveButtonClicked.next(this.editableRow);
            this.modalRef.hide();

            const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
            this.toastrService.success('Update Successfully!', '', options);

          } else if (this.map.referenceId == 'Y') {
            //Toast Message -- cbsValue
            const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
            this.toastrService.error(this.map.cbsValue, 'Update Failed!', options);
          }
        });
      } else if (this.map.sourceFlag == 'Y') {
        //Toast Message --sourceData
        const options = { closeButton: true, tapToDismiss: false, timeOut: 3000000, opacity: 1 };
        this.toastrService.error(this.map.sourceData, 'Validation Failed!', options);
      }

    });

  }

  //get promts() { return this.form.get('promts'); }
  get cbsValue() { return this.form.get('cbsValue'); }

}
