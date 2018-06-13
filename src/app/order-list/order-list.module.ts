import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { OrderListComponent } from './order-list.component';
import { OrderListAuthResolver } from './order-list-auth-resolver.service';
import { SharedModule } from '../shared';
import { OrderListRoutingModule } from './order-list-routing.module';

@NgModule({
    imports: [SharedModule, ClarityModule, OrderListRoutingModule],
    declarations: [OrderListComponent],
    providers: [OrderListAuthResolver]
})
export class OrderListModule {}
