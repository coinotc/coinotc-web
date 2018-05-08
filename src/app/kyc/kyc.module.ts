import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KycComponent } from './kyc.component';
import { KycResolver } from './kyc-resolver.service';
import { SharedModule } from '../shared';
import { KycRoutingModule } from './kyc-routing.module';


@NgModule({
    imports: [
        SharedModule,
        KycRoutingModule
    ],
    declarations: [
        KycComponent
    ],
    providers: [
        KycResolver
    ]
})
export class KycModule { }
