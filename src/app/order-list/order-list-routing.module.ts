import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { OrderListAuthResolver } from './order-list-auth-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: OrderListComponent,
        resolve: {
            isAuthenticated: OrderListAuthResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderListRoutingModule {}
