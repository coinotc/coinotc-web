import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ToastyModule } from 'ng2-toasty';

import { AdvDetailComponent } from './adv-detail.component';
// import { MarketDataAuthResolver } from './market-data-auth-resolver.service';
import { SharedModule } from '../shared';
import { AdvDetailRoutingModule } from './adv-detail.routilng.module';

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ToastyModule.forRoot(),
    AdvDetailRoutingModule
  ],
  declarations: [
    AdvDetailComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class AdvDetailModule { }
