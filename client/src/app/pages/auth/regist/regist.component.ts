// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// Services
import { AuthService, AlertService } 
from 'src/app/shared/services';
// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Enums
import { Gender, userRole } 
from 'src/app/shared/enum';


@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  private users: IUser[] = [] as IUser[];
  private registForm: FormGroup;
  private genderOfUser: string = "Мужчина";

  private userGender: string[] = [Gender.male, Gender.female]
  private userRoles: string[] = [userRole.admin, userRole.commonUser]
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userEmailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/


  private userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
    ) {
    this.userId = 1;
  }

  ngOnInit() {

    this.registForm = this.formBuilder.group ({
      userName: new FormControl(
        "", [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userEmail: new FormControl(
        "", [
          Validators.required,
          Validators.pattern(this.userEmailPattern),
      ]),
      userGender: new FormControl (
        "Мужчина", [
          Validators.required
      ]),
      userRole: new FormControl (
        "", [
          Validators.required
      ]),
      userPassword: new FormControl (
        "", [
          Validators.required,
          Validators.pattern(this.userPassPattern)
        ]
      )
    })
  }

  private radioGengre(event: any): void {
    this.genderOfUser = event.target.value
  }

  private addNewUser(repeatPass: string): void {  
    if (this.registForm.value.userPassword === repeatPass) {
      this.registForm.value.userGender = this.genderOfUser
      this.authService.registUser(this.registForm.value).subscribe((res) => {
        console.log(res)
        this.alertService.success("You registered on this sait")
        setTimeout(() => {
          this.router.navigate(["Login"])
        }, 1000)
      },
      (err) => {
        console.log(err)
        this.alertService.error(err.error.error)
      })
    } else {
      this.alertService.error("Password is wrong")
    }
  }
}  
