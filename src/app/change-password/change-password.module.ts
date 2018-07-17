import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ToastyModule } from 'ng2-toasty';

import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '../shared';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

import { TrendModule } from 'ngx-trend'

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ToastyModule.forRoot(),
    ChangePasswordRoutingModule,
    TrendModule,
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class ChangePasswordModule {}
