// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserAreaComponent } from 'src/app/pages/user/user-area/user-area.component';


const routes: Routes = [
    {
        path: "",
        component: UserAreaComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRouting {}