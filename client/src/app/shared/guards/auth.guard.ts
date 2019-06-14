// Vendors
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
//Services
import { AuthService } from 'src/app/shared/services';
// Models
import { IUser } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser: IUser = this.authService.getCurrentUser();

    if (currentUser) {
      if (route.data.roles && 
        route.data.roles.indexOf(currentUser.userRole) === -1) {
          this.router.navigate([''])
          return false
        }

        return true
    }

    this.router.navigate(["auth/Login"], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
