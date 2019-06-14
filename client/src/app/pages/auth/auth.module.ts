// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegistComponent } from 'src/app/pages/auth/regist/regist.component';
// Router
import { AuthRoutingComponent } from 'src/app/pages/auth/auth-router.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistComponent,
  ],
  imports: [
    AuthRoutingComponent,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ]
})
export class AuthModule { }
