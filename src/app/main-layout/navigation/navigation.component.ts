import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  username: string;

  constructor() {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.username = sessionStorage.getItem("authenticaterUserId");
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
