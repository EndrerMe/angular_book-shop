// Vendors
import { Component, OnInit } from '@angular/core';

//Interfaces
import { IUser } from 'src/app/shared/interfaces';
//Enums
import { userRole } from 'src/app/shared/enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private visibility: boolean = false;
  private adminBuns: boolean = false;
  private isUser: boolean = false;
  private currentUser: IUser;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (this.currentUser) {
      this.isUser = true;
      if (this.currentUser.userRole == userRole.admin){
        this.adminBuns = true;
      }
    }
  }

  ngOnInit() {
  }

  private showMenu(): void {
    this.visibility = !this.visibility;
  }

  private closeNavMenu(): void {
    this.visibility = false;
  }

}
