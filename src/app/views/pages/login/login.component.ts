import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService, ToastService } from 'ng-uikit-pro-standard';
import { AppCommons } from 'src/app/app.commons';
import { Parameters } from 'src/app/parameters';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';
import { UserRegistrationModalComponent } from '../user-registration-modal/user-registration-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})



export class LoginComponent implements OnInit {

  validationForm: FormGroup;
  loading = false;
  username = '';
  password = '';
  errorMessage = 'Wrong User Name/Password!';
  invalidLogin = false;
  map: any;
  branchName: any;
  parameters: any = new Parameters();
  modalRef: MDBModalRef;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private jwtAuthenticationService: JwtAuthenticationService,
    private toastrService: ToastService,
    private appCommons: AppCommons,
    private modalService: MDBModalService,

  ) { }

  ngOnInit() {
    this.jwtAuthenticationService.logout();
  }

  doLoginWithJWTAuth() {
    if (!this.username) {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error('Userid/name Required!', 'Sorry!', options);
    } else if (!this.password) {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error('Password Required!', 'Sorry!', options);
    } else {
      this.loading = true;
      this.jwtAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {

            console.log("data: " + data)
            this.toastrService.clear();
            this.router.navigate(['/dashboards/v1'])
            this.invalidLogin = false;
            this.loading = false;
          },
          error => {
            console.log("error: "+error.error);            
            this.toastrService.clear();
            const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
            this.toastrService.error(error.error +' !', 'Login Failed!', options);
            this.invalidLogin = true;
            this.loading = false;
          }
        )
    }
  }

  doSignUp(){
    this.modalRef = this.modalService.show(UserRegistrationModalComponent, ''); 
  }


}
