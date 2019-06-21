// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

// Services
import { AuthService, AlertService } from 'src/app/shared/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userPassword: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern),
        ]),
    });
  }

  private login(): void {
    this.authService.getUserForLogin(this.loginForm.value).subscribe((res) => {
      const decode = jwt_decode(res.token);
      this.alertService.success('You logined', false);
      localStorage.setItem('currentUser', JSON.stringify(decode));
      setTimeout(() => {
        this.router.navigate(['/all-books']);
      }, 1000);
    },
    (err) => {
      console.log(err);
      this.alertService.error(err.error.error);
    });
  }

}
