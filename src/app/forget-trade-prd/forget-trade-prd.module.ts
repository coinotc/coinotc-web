import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ToastyModule } from 'ng2-toasty';

import { ForgetTradePrdComponent } from './forget-trade-prd.component';
import { SharedModule } from '../shared';
import { ForgetTradePrdRoutingModule } from './forget-trade-prd-routing.module';

import { TrendModule } from 'ngx-trend'

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ToastyModule.forRoot(),
    ForgetTradePrdRoutingModule,
    TrendModule,
  ],
  declarations: [
    ForgetTradePrdComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class ForgetTradePrdModule {}
