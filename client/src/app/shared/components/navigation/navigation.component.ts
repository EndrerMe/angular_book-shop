// Vendors
import { Component, OnInit } from '@angular/core';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Enums
import { userRole } from 'src/app/shared/enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private visibility: boolean;
  private adminBuns: boolean;
  private isUser: boolean;
  private currentUser: IUser;

  constructor() {
    this.visibility = false;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.isUser = true;
      if (this.currentUser.userRole === userRole.admin) {
        this.adminBuns = true;
      } else {
        this.adminBuns = false;
      }
    } else {
      this.isUser = false;
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
