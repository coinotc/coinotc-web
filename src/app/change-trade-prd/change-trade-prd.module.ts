import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ToastyModule } from 'ng2-toasty';

import { ChangeTradePrdComponent } from './change-trade-prd.component';
import { SharedModule } from '../shared';
import { ChangeTradePrdRoutingModule } from './change-trade-prd-routing.module';

import { TrendModule } from 'ngx-trend'

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ToastyModule.forRoot(),
    ChangeTradePrdRoutingModule,
    TrendModule,
  ],
  declarations: [
    ChangeTradePrdComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class ChangeTradePrdModule {}
