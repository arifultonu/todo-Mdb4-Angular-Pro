import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/parameters';
import { DashboardService } from 'src/app/services/data/e-swift/dashboard.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

  parameters: any = new Parameters();
  map: any;
  elements: any = [];
  totalOutgoingMsg: any;
  
  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {

    this.getTotalNumberOfOutgoingMessageService();
  }


  getTotalNumberOfOutgoingMessageService() {
    this.parameters.branchCode = "003";    
    
    this.dashboardService.getTotalNumberOfOutgoingMessageService(this.parameters).subscribe(data => {
      this.map = data;     
      console.log(this.map.totalOutgoingMessage);
      this.totalOutgoingMsg = this.map.totalOutgoingMessageNo;

      console.log(this.totalOutgoingMsg);
    });
  }




}
