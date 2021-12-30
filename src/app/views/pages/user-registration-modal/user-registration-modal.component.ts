import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, ToastService } from 'ng-uikit-pro-standard';
import { Parameters } from 'src/app/parameters';
import { SetupService } from 'src/app/services/data/todo/setup.service';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';

@Component({
  selector: 'app-user-registration-modal',
  templateUrl: './user-registration-modal.component.html',
  styleUrls: ['./user-registration-modal.component.scss']
})
export class UserRegistrationModalComponent implements OnInit {
  @Input() shadows = true;
  parameters: any = new Parameters();
  form: FormGroup;
  map: any;
  password: any;
  confPassword: any;
  passwordMatched: any;

  constructor(
    public modalRef: MDBModalRef,
    private cdRef: ChangeDetectorRef,
    public fb: FormBuilder,
    private setupService: SetupService,
    private toastrService: ToastService,

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'username': new FormControl(),
      'password': new FormControl(),
      'confirmPassword': new FormControl(),
    })
  }

  submitRegistrationInfo() {
    const formValue = this.form.value;
    this.parameters.name = formValue.name;
    this.parameters.email = formValue.email;
    this.parameters.username = formValue.username;
    this.parameters.password = formValue.password;

    if(this.passwordMatched === "Ok"){
    this.setupService.addNewUser(this.parameters).subscribe(data => {
      this.map = data;
      console.log(data);
      const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.success('Registration Successfully Completed!', 'Welcome!', options);
    }, (error: any) => {
      console.log(error);
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error('Email and Username Must Be Unique!', 'Registration Failed!', options);
    }
    );
  } else{
    const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error("Confirm Password Must be Same as Password!", 'Registration Failed!', options);
  }
  }


  comfirmPassword() {
    const formValue = this.form.value;
    this.password = formValue.password;
    this.confPassword = formValue.confirmPassword;
    

    console.log("this.password" + this.password);
    console.log("this.confirmPassword" + this.confPassword);

    if (this.password != this.confPassword) {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 5000, opacity: 1 };
      this.toastrService.clear();
      this.toastrService.error('Password did not Match!', 'Sorry!', options);
    } else{
      this.passwordMatched = "Ok";
    }
  }



}
