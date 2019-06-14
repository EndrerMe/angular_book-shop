// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { EditAuthorsComponent } from 'src/app/pages/admin/admin-buns/edit-authors/edit-authors.component';
import { EditBooksComponent } from 'src/app/pages/admin/admin-buns/edit-books/edit-books.component';
import { EditUsersComponent } from 'src/app/pages/admin/admin-buns/edit-users/edit-users.component';
// Moduls
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services
import { BooksService } from 'src/app/shared/services';


@NgModule({
  declarations: [
    AdminComponent,
    EditAuthorsComponent,
    EditBooksComponent,
    EditUsersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    CommonModule
  ],
  providers: [
    BooksService
  ]
})
export class AdminModule { }
