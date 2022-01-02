import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  constructor(
    public jwtAuthenticationService: JwtAuthenticationService,
  ) {

  }

  ngOnInit() {
  }

}
