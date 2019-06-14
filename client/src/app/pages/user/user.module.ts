// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserComponent } from 'src/app/pages/user/user.component';
import { UserAreaComponent } from 'src/app/pages/user/user-area/user-area.component';
// Routes
import { UserRouting } from 'src/app/pages/user/user-routing.module';
// Moduls
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        UserRouting,
        SharedModule
    ],
    declarations: [
        UserComponent,
        UserAreaComponent
    ]
})

export class UserAreaModule {}