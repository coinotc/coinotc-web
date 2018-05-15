import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { CreateAdvComponent } from './create-adv.component';
// import { MarketDataAuthResolver } from './market-data-auth-resolver.service';
import { SharedModule } from '../shared';
import { CreateAdvRoutingModule } from './create-adv-routing.module';

//elegant trend grapha 
import { TrendModule } from 'ngx-trend'

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    CreateAdvRoutingModule,
    TrendModule,
  ],
  declarations: [
    CreateAdvComponent
  ],
  providers: [
    // MarketDataAuthResolver
  ]
})
export class CreateAdvModule {}
