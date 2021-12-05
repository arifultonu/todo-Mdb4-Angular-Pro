import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MdbTableDirective, MdbTablePaginationComponent, ToastService } from 'ng-uikit-pro-standard';
import { SelectCodeNameList } from 'src/app/app.component';
import { Parameters } from 'src/app/parameters';
import { CbsDataMessageService } from 'src/app/services/data/e-swift/cbs-data-message.service';
import { OutgoingSwiftMessageService } from 'src/app/services/data/e-swift/outgoing-swift-message.service';

@Component({
  selector: 'app-outgoing-swift-message',
  templateUrl: './outgoing-swift-message.component.html',
  styleUrls: ['./outgoing-swift-message.component.scss']
})
export class OutgoingSwiftMessageComponent implements OnInit {
  @Input() shadows = true;
  
  modalLoading: boolean = true;

  //Data Table
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  elements: any = [];
  modalRef: MDBModalRef;

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 10;
  map: any;
  //Data Table//

  parameters: any = new Parameters();

  //Reactive Forms
  outgoingSwiftMessageForm: FormGroup;
  messageTypeSelect: SelectCodeNameList[] = [];
  // selectedCharacter: any = 'All';
  // [(ngModel)]="selectedCharacter" 
  //Reactive Forms//
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private outgoingSwiftMessageService: OutgoingSwiftMessageService,
    private cbsDataMessageService: CbsDataMessageService,
    private toastrService: ToastService,
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

  ngOnInit(): void {
    //Reactive Forms Start
    this.outgoingSwiftMessageForm = new FormGroup({
      'branchCode': new FormControl('003'),
      'searchText': new FormControl(),
      'messageType': new FormControl(),
    });

    this.getAllOutgoingSwiftMessageData();
    this.getMessageTypeListData();

  
  }

  //Enter Event Disabled
  prevent(event){
    event.preventDefault();
   }
 
   


  searchByMT() {
    const formValue = this.outgoingSwiftMessageForm.value;
    console.log(formValue.messageType);
    this.parameters.branchCode = formValue.branchCode;
    this.parameters.messageType = formValue.messageType;
    this.modalLoading = true;
    this.outgoingSwiftMessageService.getMtWiseOutgoingSwiftMessageService(this.parameters).subscribe(data => {
      this.map = data;
      this.elements = this.map.allSwiftOutgoingMessageData;
      console.log('elements.size: ' + this.elements.length);
      console.log(this.map);

      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        this.modalLoading = false;
      } else {
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found !!', 'Sorry!', options);
        this.modalLoading = false;
      }

    });

  }


  getAllOutgoingSwiftMessageData() {
    const formValue = this.outgoingSwiftMessageForm.value;
    console.log(formValue.branchCode);
    this.parameters.branchCode = formValue.branchCode;

    this.modalLoading = true;

    this.outgoingSwiftMessageService.getAllOutgoingSwiftMessageService(this.parameters).subscribe(data => {
      this.map = data;
      this.elements = this.map.allSwiftOutgoingMessageData;
      console.log('elements.size: ' + this.elements.length);
      console.log(this.map);

      if (this.elements.length > 0) {
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();        
        this.modalLoading = false;
      } else {        
        // const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
        // this.toastrService.warning('Data didn\'t found !!', 'Sorry!', options);
        this.modalLoading = false;
      }

    });

    
  }


goOutgoingSwiftMessageEdit(documentNo: any, messageType: any, messageName: any){  
  this.router.navigate(['/outgoingSwiftMessageEdit', documentNo, messageType, messageName]);
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

  backToDashboard(){
    this.router.navigate(['/dashboards/v1']);
  }



}
