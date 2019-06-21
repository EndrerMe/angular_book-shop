// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EditUsersComponent } from 'src/app/pages/admin/admin-buns/edit-users/edit-users.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { EditAuthorsComponent } from 'src/app/pages/admin/admin-buns/edit-authors/edit-authors.component';
import { EditBooksComponent } from 'src/app/pages/admin/admin-buns/edit-books/edit-books.component';

const routes: Routes = [

    {
        path: '',
        component: AdminComponent,
        children: [
            {path: 'Users', component: EditUsersComponent},
            {path: 'Books', component: EditBooksComponent},
            {path: 'Authors', component: EditAuthorsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}

