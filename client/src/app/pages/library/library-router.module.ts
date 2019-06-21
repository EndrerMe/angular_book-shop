// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LibraryComponent } from 'src/app/pages/library/library.component';
import { AllBooksComponent } from 'src/app/pages/library/allBooks/allBooks.component';
import { ViewBookComponent } from 'src/app/pages/library/view-book/view-book.component';
import { ShoppingBagComponent } from 'src/app/pages/library/shopping-bag/shopping-bag.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'all-books',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LibraryComponent,
        children: [
            {path: 'all-books', component: AllBooksComponent},
            {path: 'book/:id', component: ViewBookComponent},
            {path: 'Shopping-bag', component: ShoppingBagComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LibraryRoutingComponent {}
