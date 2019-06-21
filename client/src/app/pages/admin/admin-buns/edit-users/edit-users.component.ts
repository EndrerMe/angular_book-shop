// Vendors
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Services
import { UserService, AlertService, AuthService } from 'src/app/shared/services';
// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Enums
import { Gender, userRole } from 'src/app/shared/enum';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  private users: IUser[] = [] as IUser[];
  private activeUser: IUser;
  private visibility: string;
  private userForChange: IUser;
  private page: number;
  private modalVisibility: boolean;
  private changeForm: FormGroup;
  private modalNewUserVisibility: boolean;
  private genderOfTheUser: string = 'Мужчина';
  private total: number;

  private registForm: FormGroup;
  private userGender: string[] = [Gender.male, Gender.female];
  private userRoles: string[] = [userRole.admin, userRole.commonUser];
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userEmailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.activeUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.modalVisibility = false;
    this.modalNewUserVisibility = false;
    this.getPage(this.page);
  }

  ngOnInit() {

    this.changeForm = this.formBuilder.group ({
      id: new FormControl(
        '', [
      ]),
      userName: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userEmail: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userEmailPattern),
      ]),
      userGender: new FormControl (
        'Мужчина', [
          Validators.required
      ]),
      userRole: new FormControl (
        '', [
          Validators.required
      ]),
      userPassword: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern)
      ])
    });

    this.registForm = this.formBuilder.group ({
      userName: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userEmail: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userEmailPattern),
      ]),
      userGender: new FormControl (
        'Мужчина', [
          Validators.required
      ]),
      userRole: new FormControl (
        '', [
          Validators.required
      ]),
      userPassword: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern)
      ])
    });
  }

  public getTotal(): void {
    this.userService.getTotal().subscribe((res) => {
      this.total = res;
    },
    (err) => {
      console.log(err);
    });
  }

  public getPage(page: number): void {
    console.log(page);
    const paging = {
      currentPage: page
    };
    this.userService.paging(paging).subscribe((res) => {
      this.users = res;
      this.page = page;
      this.getTotal();
    },
    (err) => {
      console.log(err);
    });
  }

  private radioGengre(event: any) {
    this.genderOfTheUser = event.target.value;
  }

  private showUserInfo(userId: string): void {
    if (this.visibility === userId) {
      this.visibility = '';
      return;
    }
    this.visibility = userId;
  }

  private deleteUser(user: IUser): void {
    console.log(user);
    this.userService.deleteUser(user).subscribe();
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i].id) {
        this.users.splice(i, 1);
      }
    }
  }

  private modalChangeUser(user: IUser): void {
    this.userForChange = user;
    this.modalVisibility = true;
  }

  private changeUserData(repeatPass: string): void {
    if (this.changeForm.value.userPassword === repeatPass) {
      this.changeForm.value.id = this.userForChange.id;
      this.userForChange = this.changeForm.value;
      this.userForChange.userGender = this.genderOfTheUser;
      console.log(this.userForChange);
      this.userService.changeUser(this.userForChange).subscribe((res) => {
        console.log(res);
        this.alertService.success('User is change');
      },
      (err) => {
        console.log(err);
        this.alertService.success(err.error.error);
      });
      this.changeForm.reset();
      for (let i = 0; i < this.users.length; i++) {
        if (this.userForChange.id === this.users[i].id) {
          this.users[i] = this.userForChange;
        }
      }
      this.modalVisibility = false;
    } else {
      this.alertService.error('Wrong user data');
    }
  }

  private closeModal(): void {
    this.modalVisibility = false;
  }

  private modalNewUser(): void {
    this.modalNewUserVisibility = true;
  }

  private addNewUser(repeatPassword: string): void {
    if (this.registForm.value.userPassword === repeatPassword) {
      this.registForm.value.userGender = this.genderOfTheUser;
      this.authService.registUser(this.registForm.value).subscribe((res) => {
        this.users.push(this.registForm.value);
        this.getPage(this.page);
        this.alertService.success('User is created', false);
      },
      (err) => {
        console.log(err);
        this.alertService.error(err.error.error);
      });
      this.modalNewUserVisibility = false;
      this.registForm.reset();
      this.getPage(this.page);
    } else {
      this.alertService.error('Wrong password');
    }
  }

  private closeModalNewUser(): void {
    this.modalNewUserVisibility = false;
  }

}
