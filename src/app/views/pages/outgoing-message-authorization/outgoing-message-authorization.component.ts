import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { SelectCodeNameList } from 'src/app/app.component';
import { Parameters } from 'src/app/parameters';
import { CbsDataMessageService } from 'src/app/services/data/e-swift/cbs-data-message.service';
import { OutgoingMessageAuthorizationService } from 'src/app/services/data/e-swift/outgoing-message-authorization.service';

@Component({
  selector: 'app-outgoing-message-authorization',
  templateUrl: './outgoing-message-authorization.component.html',
  styleUrls: ['./outgoing-message-authorization.component.scss']
})
export class OutgoingMessageAuthorizationComponent implements OnInit {
  @Input() shadows = true;
  modalLoading: boolean = true;

  public radioModel: string = '';

  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: any = [];
  modalRef: MDBModalRef;
  editField: string;
  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 10;
  map: any;
  //Data Table//

  parameters: any = new Parameters();

  //Reactive Forms
  outgoingAuthorizationForm: FormGroup;
  radioFormGroup: FormGroup;
  messageTypeSelect: SelectCodeNameList[] = [];
  errorMessage: any;
  errorCode: any;
  //Reactive Forms//
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private outgoingMessageAuthorizationService: OutgoingMessageAuthorizationService,
    private cbsDataMessageService: CbsDataMessageService,
    private toastrService: ToastService,
  ) { }


  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  onOpened(event: any) {
    console.log(event);
  }


  ngAfterViewInit(): void {
    //Data Table
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    //Data Table//
  }

  ngOnInit(): void {
    //Reactive Forms Start
    this.outgoingAuthorizationForm = new FormGroup({
      'branchCode': new FormControl('003'),
      'searchText': new FormControl(),
      'messageType': new FormControl(),
    });

    //   this.radioFormGroup = new FormGroup({
    //     approve: new FormControl(),
    //     modify: new FormControl(),
    //  });

    this.getAllOutgoingAuthorizationMessageData();
    this.getMessageTypeListData();
  }


  outgoingAuthorizaionMessageModify(swiftStatus: any, documentNo: any) {
    this.parameters.documentNo = documentNo;
    this.parameters.swiftStatus = swiftStatus;
    this.outgoingMessageAuthorizationService.outgoingAuthorizaionMessageModifyService(this.parameters).subscribe(data => {
      this.map = data;
      this.errorCode = this.map.errorCode;
      this.errorMessage = this.map.errorMessage;
      console.log(this.map);
      if (this.errorCode == 0) {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.info('Modify Request Send Successful!!', 'Success!', options);
      } else if (this.errorCode == 1) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.errorMessage, 'Sorry!', options);
      }
    });
  }

  outgoingAuthorizaionMessageReset(swiftStatus: any, documentNo: any) {
    this.parameters.documentNo = documentNo;
    this.parameters.swiftStatus = swiftStatus;
    this.outgoingMessageAuthorizationService.outgoingAuthorizaionMessageModifyService(this.parameters).subscribe(data => {
      this.map = data;
      this.errorCode = this.map.errorCode;
      this.errorMessage = this.map.errorMessage;
      console.log(this.map);
      if (this.errorCode == 0) {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.info('Reset Successful!!', 'Success!', options);
      } else if (this.errorCode == 1) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.errorMessage, 'Sorry!', options);
      }
    });
  }

  outgoingAuthorizaionMessageApprove(messageType: any, documentNo: any) {
    this.parameters.branchCode = '003';
    this.parameters.messageType = messageType;
    this.parameters.documentNo = documentNo;
    this.outgoingMessageAuthorizationService.outgoingAuthorizaionMessageApproveService(this.parameters).subscribe(data => {
      this.map = data;
      this.errorCode = this.map.errorCode;
      this.errorMessage = this.map.errorMessage;
      console.log(this.map);
      if (this.errorCode == 0) {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.info('Message Approved Successfull!!', 'Success!', options);
      } else if (this.errorCode == 1) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.errorMessage, 'Sorry!', options);
      }
    });
  }

  submitMessageToSwift() {
    this.parameters.branchCode = '003';
    this.parameters.arrayList = this.elements;
    this.outgoingMessageAuthorizationService.outgoingAuthorizaionMessageApproveModifyService(this.parameters).subscribe(data => {
      this.map = data;
      this.errorCode = this.map.errorCode;
      this.errorMessage = this.map.errorMessage;
      console.log(this.map);
      if (this.errorCode == 0) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.success(this.errorMessage, 'Success!', options);
        this.getAllOutgoingAuthorizationMessageData();
      } else if (this.errorCode == 1) {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        this.toastrService.error(this.errorMessage, 'Sorry!', options);
      }
    });
  }



  updateList(id: number, status: any, messageType: any, documentNo: any, event: any) {
    const editField = event.target.textContent;
    this.elements[id][status] = editField;
    console.log(this.elements);
    console.log("documentNo: " + documentNo);
    // this.checkValidition(cbsField, editField, documentNo, messageType);
  }

  changeValue(id: number, status: any, event: any) {
    this.editField = event.target.textContent;
  }

  //updateOutgoingSwiftMessage() {    
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
  // }


  // submitMessageToSwift(){ 
  //   const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
  //   this.toastrService.success('Message Submited to Swift Successfull !!', 'Success!', options);
  //   this.getAllOutgoingAuthorizationMessageData();
  // }

  searchByMT() {
    const formValue = this.outgoingAuthorizationForm.value;
    console.log(formValue.messageType);
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.messageType = formValue.messageType;
    this.outgoingMessageAuthorizationService.getMtWiseOutgoingAuthorizationMessageService(this.parameters).subscribe(data => {
      this.map = data;
      this.elements = this.map.allAuthorizationOutgoingMessageData;
      console.log('elements.size: ' + this.elements.length);
      console.log(this.map);
      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      } else {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data Not Found to display!!', 'Sorry!', options);
      }
    });
  }


  getAllOutgoingAuthorizationMessageData() {
    const formValue = this.outgoingAuthorizationForm.value;
    console.log(formValue.branchCode);
    this.parameters.branchCode = formValue.branchCode;
    this.modalLoading = true;
    this.outgoingMessageAuthorizationService.getAllOutgoingAuthorizationMessageService(this.parameters).subscribe(data => {
      this.map = data;
      this.elements = this.map.allAuthorizationOutgoingMessageData;
      console.log('elements.size: ' + this.elements.length);
      console.log(this.map);
      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.modalLoading = false;
      } else {
        this.modalLoading = false;
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found to display!!', 'Sorry!', options);
      }
    });
  }


  goOutgoingAuthorizaionMessageDetails(documentNo: any, messageType: any, messageName: any) {
    this.router.navigate(['/outgoingAuthorizaionMessageDetails', documentNo, messageType, messageName]);
  }


  getMessageTypeListData() {
    this.cbsDataMessageService.getMessageTypeDataService().subscribe(data => {
      this.map = data;
      console.log(this.map);
      this.messageTypeSelect = this.map.messageTypeDataList;
    });
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

  //Enter Event Disabled
  prevent(event) {
    event.preventDefault();
  }

}
