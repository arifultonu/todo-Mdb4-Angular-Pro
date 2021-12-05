import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { OutgoingSwiftMessageService } from 'src/app/services/data/e-swift/outgoing-swift-message.service';

@Component({
  selector: 'app-outgoing-swift-message-edit',
  templateUrl: './outgoing-swift-message-edit.component.html',
  styleUrls: ['./outgoing-swift-message-edit.component.scss']
})
export class OutgoingSwiftMessageEditComponent implements OnInit {
  @Input() shadows = true;
  modalLoading: boolean = true;

  documentNumber: any;
  messageType: any;
  messageName: any;
  cbsField: any;
  swiftValue: any;
  cbsValue: any;
  documentNo: any;

  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  outgoingEditMessageData: any = [];

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 5;

  //Data Table//
  editField: string;
  //Reactive Forms
  outgoingSwiftMessageEditForm: FormGroup;
  //Reactive Forms//

  parameters: any = new Parameters();
  map: any;
  form: any;
  cbsDataMessageService: any;
  editableRow: any;
  saveButtonClicked: any;
  modalRef: any;
  errorCode: any;
  errorMessage: any;
  validationFlag: any;

  totalCbsFlag1: any;
  date: Date = new Date();


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private outgoingSwiftMessageService: OutgoingSwiftMessageService,
    private toastrService: ToastService,
  ) { }


  ngOnInit() {
    // this.date = new Date();
    // let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    //console.log('Date: '+ new Date());

    //Reactive Forms Start
    this.outgoingSwiftMessageEditForm = new FormGroup({
      'branchCode': new FormControl('003')
    });

    //Receive value from Router Header
    this.documentNumber = this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params);
      this.documentNo = params.get('documentNo');
      this.messageType = params.get('messageType');
      this.messageName = params.get('messageName');
    });

    // this.messageTypeParam = this.activatedRoute.paramMap.subscribe(params => {
    //   console.log(params);
    //   this.messageTypeParam = params.get('messageType');
    // });
    this.getOutgoingSwiftMessageByDocNo(this.documentNo, this.messageType);
    this.getCbsFlag1OutgoingSwiftMessageByDocNo(this.documentNo, this.messageType);

  }




  // setDate() {
  //   const date = newDate();    
  //   const year= date.getUTCFullYear();    
  //   const month= date.getUTCMonth() +1;    
  //   const day= date.getUTCDate();    
  //   this.model= { date: { year, month, day } };    
  //   }

  getCbsFlag1OutgoingSwiftMessageByDocNo(documentNo, messageType) {
    const formValue = this.outgoingSwiftMessageEditForm.value;
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.documentNo = documentNo;
    this.parameters.messageType = messageType;

    this.outgoingSwiftMessageService.noOfCbsFlag1Service(this.parameters).subscribe(data => {
      this.map = data;

      this.totalCbsFlag1 = this.map.noOfCbsFlag1;
      console.log("totalCbsFlag1: " + this.totalCbsFlag1);
    });
  }


  getOutgoingSwiftMessageByDocNo(documentNo, messageType) {
    const formValue = this.outgoingSwiftMessageEditForm.value;
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.documentNo = documentNo;
    this.parameters.messageType = messageType;
    console.log('documentNo: ' + this.parameters.documentNo);
    this.modalLoading = true;
    this.outgoingSwiftMessageService.getOutgoingSwiftMessageByDocNoService(this.parameters).subscribe(data => {
      this.map = data;
      this.outgoingEditMessageData = this.map.swiftOutgoingMessageDataByDocNo;
      console.log(this.outgoingEditMessageData);
      if (this.outgoingEditMessageData.length > 0) {
        this.mdbTable.setDataSource(this.outgoingEditMessageData);
        this.outgoingEditMessageData = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.modalLoading = false;
      } else {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found!!', 'Sorry!', options);
      }
    });
  }


  checkValidition(cbsField: any, swiftValue: any, documentNo: any, messageType: any) {
    this.parameters.messageType = messageType;
    this.parameters.cbsField = cbsField;
    this.parameters.swiftValue = swiftValue;
    this.parameters.documentNo = documentNo;

    this.outgoingSwiftMessageService.checkOutgoingSwiftMessageService(this.parameters).subscribe(data => {
      this.map = data;
      console.log("checkValidition sourceFlag: " + this.map.sourceFlag);
      if (this.map.sourceFlag == 0) {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.success('Validation Successful!', 'Success!', options);
        this.updateRowOutgoingSwiftMessage();
      } else if (this.map.sourceFlag == 1) {
        this.getOutgoingSwiftMessageByDocNo(this.documentNo, this.messageType);
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.error(this.map.sourceData, 'Validation Failed!', options);
      }
    });

  }

  updateList(id: number, swiftValue: string, cbsField: any, documentNo: any, messageType: any, event: any) {
    const editField = event.target.textContent;
    this.outgoingEditMessageData[id][swiftValue] = editField;
    console.log(editField);
    this.checkValidition(cbsField, editField, documentNo, messageType);
  }

  changeValue(id: number, swiftValue: any, event: any) {
    this.editField = event.target.textContent;
  }

  onOpened(event: any) {
    console.log(event);
  }

  updateRowOutgoingSwiftMessage() {
    console.log(this.outgoingEditMessageData);
    this.parameters.arrayList = this.outgoingEditMessageData;
    this.parameters.documentNo = this.documentNo;
    this.parameters.modifyBy = "Admin";
    this.parameters.modifyDate = "21-SEP-2021";
    this.parameters.approveStatus = "O";

    this.outgoingSwiftMessageService.updateRowOutgoingSwiftMessageService(this.parameters).subscribe(data => {
      this.map = data;
      console.log('UpdateRow referenceId: ' + this.map.referenceId);
      console.log('UpdateRow swiftValue: ' + this.map.swiftValue);
      if (this.map.referenceId == 0) {
        this.outgoingEditMessageData = this.map.swiftOutgoingMessageDataByDocNo;
        if (this.outgoingEditMessageData.length > 0) {
          this.mdbTable.setDataSource(this.outgoingEditMessageData);
          this.outgoingEditMessageData = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
          this.getCbsFlag1OutgoingSwiftMessageByDocNo(this.documentNo, this.messageType);
        } else {
          // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
          // this.toastrService.warning('Data didn\'t found for Validation!!', 'Sorry!', options);
        }
      } else if (this.map.referenceId == 1) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.map.swiftValue, 'Update Failed!', options);
      }
    });
  }



  updateOutgoingSwiftMessage() {
    const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
    this.toastrService.success('Message Saved Successful!', 'Success!', options);
    // console.log(this.outgoingEditMessageData);
    // this.parameters.arrayList = this.outgoingEditMessageData;
    // this.parameters.documentNo = this.documentNo;
    // this.parameters.modifyBy = "Admin";
    // this.parameters.modifyDate = "20-SEP-2021";
    // this.parameters.approveStatus = "O";

    // this.outgoingSwiftMessageService.updateOutgoingSwiftMessageService(this.parameters).subscribe(data => {
    //   this.map = data;
    //   console.log('Update referenceId: ' + this.map.referenceId);
    //   console.log('Update swiftValue: ' + this.map.swiftValue);
    //   if (this.map.referenceId == 0) {
    //     this.outgoingEditMessageData = this.map.swiftOutgoingMessageDataByDocNo;
    //     if (this.outgoingEditMessageData.length > 0) {
    //       this.mdbTable.setDataSource(this.outgoingEditMessageData);
    //       this.outgoingEditMessageData = this.mdbTable.getDataSource();
    //       this.previous = this.mdbTable.getDataSource();
    //       this.getCbsFlag1OutgoingSwiftMessageByDocNo(this.documentNo, this.messageType);

    //       const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
    //       this.toastrService.success('Message Saved as Draft Successful!', 'Success!', options);
    //     } else {
    //       // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
    //       // this.toastrService.warning('Data didn\'t found for Validation!!', 'Sorry!', options);
    //     }        
    //   } else if (this.map.referenceId == 1) {
    //     const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
    //     this.toastrService.error(this.map.swiftValue, 'Update Failed!', options);
    //   }
    // });
  }



  sendToAuthOutgoingSwiftMessage() {
    this.parameters.documentNo = this.documentNo;
    this.parameters.swiftStatus = 'O';

    this.outgoingSwiftMessageService.sendToAuthorizationService(this.parameters).subscribe(data => {
      this.map = data;

      this.errorCode = this.map.errorCode;
      this.errorMessage = this.map.errorMessage;

      if (this.errorCode == '0') {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.info('Message Send Successful. Please Wait for Approval !', '', options);
        this.router.navigate(['/outgoingSwiftMessage']);
      } else if (this.errorCode == '1') {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.errorMessage, 'Failed!', options);
      }

    });

  }


  backToOutgoingSwiftMsgPage() {
    this.router.navigate(['/outgoingSwiftMessage']);
  }

  print() {
    // do other stuff...
    window.print();
  }


}


