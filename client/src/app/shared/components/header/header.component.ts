// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  private userName: string;
  private userId: number;
  private visibility: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    if (localStorage.getItem('currentUser')) {
      this.userName = JSON.parse(localStorage.getItem('currentUser')).userName;
      this.userId = JSON.parse(localStorage.getItem('currentUser')).id;
      console.log(this.userName);
      this.visibility = true;
    } else {
      this.visibility = false;
    }
  }

  ngOnInit() {
  }

  private logout(): void {
    this.authService.userLogOut();
    window.location.reload();
  }

  private toUserArea(): void {
    this.router.navigate(['UserArea']);
  }
}
