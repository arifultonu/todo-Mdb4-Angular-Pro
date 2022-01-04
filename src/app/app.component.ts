import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtAuthenticationService } from './services/security/jwt-authentication.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];

  specialPage: boolean;

  private specialPages: any[] = [    
    // '/login',
    // '/pages/register',
    // '/pages/lock',
    // '/pages/pricing',
    // '/pages/single-post',
    // '/pages/post-listing'
  ];

  private currentUrl = '';

  constructor(
    private router: Router,
    private location: Location,
    public jwtAuthenticationService: JwtAuthenticationService,
    private bnIdle: BnNgIdleService,
  ) {

    this.router.events.subscribe((route: any) => {
      if (route.routerEvent) {
        this.currentUrl = route.routerEvent.url;
      } else {
        this.currentUrl = route.url;
      }
      this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });


    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res && jwtAuthenticationService.isUserLoggedIn()) {
        alert('Your Session has Expired!! Please Login Again to Proceed...');
        this.router.navigate(['login']);
      }
    });

  }

    ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  } 

}


export interface SelectCodeNameList{
  value: string,
  label: string
}