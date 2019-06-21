// Vendors
import { NgModule } from '@angular/core';

// Services
import { BagService, BooksService } from 'src/app/shared/services';
// Routing
import { LibraryRoutingComponent } from 'src/app/pages/library/library-router.module';
// Components
import { LibraryComponent } from 'src/app/pages/library/library.component';
import { ViewBookComponent } from 'src/app/pages/library/view-book/view-book.component';
import { ShoppingBagComponent } from 'src/app/pages/library/shopping-bag/shopping-bag.component';
import { AllBooksComponent } from 'src/app/pages/library/allBooks/allBooks.component';
// Moduls
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LibraryComponent,
    ViewBookComponent,
    ShoppingBagComponent,
    AllBooksComponent,
  ],
  imports: [
    LibraryRoutingComponent,
    SharedModule
  ],
  providers: [BooksService, BagService]
})
export class LibraryModule { }
