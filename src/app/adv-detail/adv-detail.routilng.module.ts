import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvDetailComponent } from './adv-detail.component';
// import { MarketDataAuthResolver } from './market-data-auth-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: AdvDetailComponent
    // resolve: {
    //   isAuthenticated: MarketDataAuthResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvDetailRoutingModule {}
