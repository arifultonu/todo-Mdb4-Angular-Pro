import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import { Observable } from 'rxjs';
import { JwtAuthenticationService } from '../security/jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private jwtAuthenticationService: JwtAuthenticationService,
    private router: Router) {

  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.jwtAuthenticationService.isUserLoggedIn()){
      return true;
    } else {
    this.router.navigate(['login']);
    return false;
      }
  }


}
