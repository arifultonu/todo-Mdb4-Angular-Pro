import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { OutgoingMessageAuthorizationService } from 'src/app/services/data/e-swift/outgoing-message-authorization.service';

@Component({
  selector: 'app-outgoing-message-authorization-details',
  templateUrl: './outgoing-message-authorization-details.component.html',
  styleUrls: ['./outgoing-message-authorization-details.component.scss']
})
export class OutgoingMessageAuthorizationDetailsComponent implements OnInit {
  @Input() shadows = true;
  modalLoading: boolean = true;
  
  documentNumber: any;
  messageType: any;
  messageName: any;
  cbsField: any;
  cbsValue: any;
  documentNo: any;

  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: any = [];

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 5;

  //Data Table//

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
  totalOutgoingEditableRow: any;
  totalNFlag: void;

  constructor(
    private activatedRoute: ActivatedRoute,
    private outgoingMessageAuthorizationService: OutgoingMessageAuthorizationService,
    private toastrService: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    //Reactive Forms Start
    this.outgoingSwiftMessageEditForm = new FormGroup({
      'branchCode': new FormControl('003')
    });

    //Receive value from Router Header
    this.documentNumber = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.documentNo = params.get('documentNo');
      this.messageType = params.get('messageType');
      this.messageName = params.get('messageName');
    });

    // this.messageTypeParam = this.activatedRoute.paramMap.subscribe(params => {
    //   console.log(params);
    //   this.messageTypeParam = params.get('messageType');
    // });
    this.getAuthorizationOutgoingSwiftMessageDetails(this.documentNo, this.messageType);

  }

 

  getAuthorizationOutgoingSwiftMessageDetails(documentNo, messageType) {
    const formValue = this.outgoingSwiftMessageEditForm.value;
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.documentNo = documentNo;
    this.parameters.messageType = messageType;
    console.log(this.parameters.documentNo);

    this.modalLoading = true;
    
    this.outgoingMessageAuthorizationService.getOutgoingAuthorizationMessageByDocNoService(this.parameters).subscribe(data => {
      this.map = data;

      this.elements = this.map.swiftOutgoingMessageDataByDocNo;
      console.log('elements.size: ' + this.elements.length);
      this.totalOutgoingEditableRow = this.elements.length;
     // this.totalNFlag = this.elements.cbsField;
      console.log(this.map);

      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();

        this.modalLoading = false;

      } else {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found !!', 'Sorry!', options);
      }

    });
  }

  backToAuthorizationPage(){
    this.router.navigate(['/outgoingMessageAuthorization']);
  }

  print() {
    // do other stuff...
    window.print();
  }




}
