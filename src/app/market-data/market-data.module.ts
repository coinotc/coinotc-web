import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { MarketDataComponent } from './market-data.component';
import { MarketDataAuthResolver } from './market-data-auth-resolver.service';
import { SharedModule } from '../shared';
import { MarketDataRoutingModule } from './market-data-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    MarketDataRoutingModule
  ],
  declarations: [
    MarketDataComponent
  ],
  providers: [
    MarketDataAuthResolver
  ]
})
export class MarketDataModule {}
