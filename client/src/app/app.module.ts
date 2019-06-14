// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Services
import { AuthService } from 'src/app/shared/services';
// Components
import { AppComponent } from 'src/app/app.component';
import { AlertComponent } from './shared/directives/alert/alert.component';
// Routing
import { AppRoutingModule } from 'src/app/app-routing.module';
// Moduls
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
