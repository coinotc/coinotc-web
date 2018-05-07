import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketDataComponent } from './market-data.component';
import { MarketDataAuthResolver } from './market-data-auth-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MarketDataComponent,
    resolve: {
      isAuthenticated: MarketDataAuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketDataRoutingModule {}
