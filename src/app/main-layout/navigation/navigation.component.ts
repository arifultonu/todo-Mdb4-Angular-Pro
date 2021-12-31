import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  username: string;

  constructor(
    public jwtAuthenticationService: JwtAuthenticationService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.username = sessionStorage.getItem("authenticaterUserId");
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
