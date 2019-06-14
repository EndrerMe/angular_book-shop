// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegistComponent } from 'src/app/pages/auth/regist/regist.component';
// Guards
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
// Enums
import { userRole } from 'src/app/shared/enum/userRole.enum';

const routes: Routes = [
  {
    path: '', 
    loadChildren: "src/app/pages/library/library.module#LibraryModule"
  },
  {
    path: 'auth',
    loadChildren: "src/app/pages/auth/auth.module#AuthModule"
  },
  {
    path: 'UserArea',
    loadChildren: "src/app/pages/user/user.module#UserAreaModule",
    data: {roles: [userRole.admin, userRole.commonUser]},
    canActivate: [AuthGuard]
  },
  {
    path: "adminBuns",
    loadChildren: "src/app/pages/admin/admin.module#AdminModule",
    data: {roles: userRole.admin},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
