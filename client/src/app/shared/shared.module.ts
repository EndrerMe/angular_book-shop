// Vendors
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { NavigationComponent } from 'src/app/shared/components/navigation/navigation.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule
  ],
  exports: [
    CommonModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NavigationComponent,
    HeaderComponent
  ]
})
export class SharedModule { }