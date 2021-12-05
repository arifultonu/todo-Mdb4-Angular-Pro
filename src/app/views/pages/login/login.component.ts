import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { AppCommons } from 'src/app/app.commons';
import { Parameters } from 'src/app/parameters';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})



export class LoginComponent implements OnInit {
  
  validationForm: FormGroup;
  loading = false;
  userId = '';
  password = '';
  errorMessage = 'Wrong User Name/Password!';
  invalidLogin = false;
  map: any;
  branchName: any;
  parameters: any = new Parameters();
  
  constructor(public fb: FormBuilder,
    private router: Router,
    private jwtAuthenticationService: JwtAuthenticationService,
    private toastrService: ToastService,
    private appCommons: AppCommons,
    
    ) { }

  ngOnInit() {
    this.jwtAuthenticationService.logOut();
  }

  doLoginWithJWTAuth() {    
    if(!this.userId){
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.warning('Userid Required!', 'Sorry!', options);          
    } else if(!this.password){
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.warning('Password Required!', 'Sorry!', options);
    } else {
    this.loading = true;
    this.jwtAuthenticationService.executeJWTAuthenticationService(this.userId, this.password).subscribe(
      (data: { token: any; map: any}) => {
        if(data.map.errorMsg != 'Success'){
          console.log("data.map.errorMsg: "+data.map.errorMsg);
          this.invalidLogin = true;
          this.loading = false;
          const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
          this.toastrService.clear();
          this.toastrService.error(data.map.errorMsg, 'Sorry!', options);          
        }else{
          console.log("else .errorMsg: "+data.map.errorMsg);
          this.router.navigate(['dashboard2']);
          this.invalidLogin = false;
          this.loading = false;
          const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
          // this.toastrService.success(data.map.errorMsg, 'Login Successfully Completed!', options);
        }
      },
      (error: any) => {
        console.log(error);
        const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
        this.toastrService.clear();
        this.toastrService.error(error+', Please contact with system administrator.', 'Sorry!', options);
        this.invalidLogin = true;
        this.loading = false;
      },      
    )
  } 
  }



}
