import { AfterViewInit, Component, Input, OnInit, ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectCodeNameList } from 'src/app/app.component';

import { MdbTableDirective, MdbTablePaginationComponent, ToastService } from "ng-uikit-pro-standard";
import { MDBModalRef, MDBModalService } from "ng-uikit-pro-standard";
import { CbsDataMessageEditComponent } from "src/app/views/pages/cbs-data-message-edit/cbs-data-message-edit.component";
import { Parameters } from 'src/app/parameters';
import { AppCommons } from 'src/app/app.commons';
import { CbsDataMessageService } from 'src/app/services/data/e-swift/cbs-data-message.service';

@Component({
  selector: 'app-cbs-data-message',
  templateUrl: './cbs-data-message.component.html',
  styleUrls: ['./cbs-data-message.component.scss']
})
export class CbsDataMessageComponent implements OnInit, AfterViewInit {
  @Input() shadows = true;


  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: any = [];
  modalRef: MDBModalRef;

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 5;

  //Data Table//


  //Reactive Forms
  cbsDataMessageForm: FormGroup;
  //Reactive Forms//

  //Select List Item
  messageTypeSelect: SelectCodeNameList[] = [];
  pendingDocNoSelect: SelectCodeNameList[] = [];
  //Select List Item//

  parameters: any = new Parameters();
  map: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private cbsDataMessageService: CbsDataMessageService,
    private toastrService: ToastService,
    private appCommons: AppCommons
  ) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngAfterViewInit(): void {
    //Data Table
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    //Data Table//
  }

  ngOnInit() {
    //Reactive Forms Start
    this.cbsDataMessageForm = new FormGroup({
      'branchCode': new FormControl('003'),
      'messageType': new FormControl({ value: null }, Validators.required),
      'pendingDocNo': new FormControl({ value: null }, Validators.required),
      'searchText': new FormControl(),

    });

    //All Functions
    this.getMessageTypeListData();
    this.getPendingDocNoListData();

  }


  getMessageTypeListData() {
    this.cbsDataMessageService.getMessageTypeDataService().subscribe(data => {
      this.map = data;
      console.log(this.map);
      this.messageTypeSelect = this.map.messageTypeDataList;
    });
  }

  getPendingDocNoListData() {
    this.cbsDataMessageService.getPendingDocNoDataService().subscribe(data => {
      this.map = data;
      console.log(this.map);
      this.pendingDocNoSelect = this.map.pendingDocumentNoDataList;
    });
  }

  getCbsMessageDataList() {
    const formValue = this.cbsDataMessageForm.value;
    console.log(formValue.branchCode);
    console.log(formValue.messageType);
    console.log(formValue.pendingDocNo);
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.messageType = formValue.messageType;
    this.parameters.referenceId = formValue.pendingDocNo;

    this.cbsDataMessageService.getCbsMessageDataListService(this.parameters).subscribe(data => {
      this.map = data;
      
      this.elements = this.map.cbsDataForMessageCreation;
      console.log('elements.size: ' + this.elements.length);
      console.log(this.map);

      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      } else {
        const options = { closeButton: true, tapToDismiss: false, timeOut: 150000, opacity: 1 };
        this.toastrService.warning('Data Not Found !!', 'Sorry!', options);
      }

    });
  }

  submitCbsMessageData() {
    this.mdbTable.setDataSource('');
    this.cbsDataMessageForm.reset();

    const options = { closeButton: true, tapToDismiss: false, timeOut: 150000, opacity: 1 };
    this.toastrService.info('Message Send Successfully. Please Wait for Approval !', '', options);

  }


  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    console.log('elementIndex: ' + elementIndex);
    this.modalRef = this.modalService.show(CbsDataMessageEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
    });
    this.mdbTable.setDataSource(this.elements);
  }

  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
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
