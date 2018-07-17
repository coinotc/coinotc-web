import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ToastyModule } from 'ng2-toasty';

import { TwoFactorAuthenticationComponent } from './two-factor-authentication.component';
import { SharedModule } from '../shared';
import { TwoFactorAuthenticationRoutingModule } from './two-factor-authentication-routing.module';

import { TrendModule } from 'ngx-trend'

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ToastyModule.forRoot(),
    TwoFactorAuthenticationRoutingModule,
    TrendModule,
  ],
  declarations: [
    TwoFactorAuthenticationComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class TwoFactorAuthenticationModule {}
