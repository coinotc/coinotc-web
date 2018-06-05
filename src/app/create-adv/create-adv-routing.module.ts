import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAdvComponent } from './create-adv.component';
// import { MarketDataAuthResolver } from './market-data-auth-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CreateAdvComponent,
    resolve: {
      // isAuthenticated: MarketDataAuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAdvRoutingModule {}
