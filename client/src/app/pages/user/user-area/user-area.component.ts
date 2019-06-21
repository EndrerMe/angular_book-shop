// Vendors
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from 'src/app/shared/services';
// Interfaces
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  private users: IUser[];
  private currentUser: IUser;
  private visibility: boolean;
  private adminBuns: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.visibility = false;
    this.adminBuns = false;
    if (this.currentUser.userRole === 'Администратор') {
      this.adminBuns = true;
    }
  }

  ngOnInit() {
  }

  private logout(): void {
    this.authService.userLogOut();
    this.router.navigate(['']);
  }

  private showMenu(): void {
    this.visibility = !this.visibility;
  }

}
