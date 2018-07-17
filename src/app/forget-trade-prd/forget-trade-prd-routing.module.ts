import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetTradePrdComponent } from './forget-trade-prd.component';
import { ForgetTradePrdAuthResolver } from './forget-trade-prd-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ForgetTradePrdComponent,
  //   resolve: {
  //     isAuthenticated: ForgetTradePrdAuthResolver
  // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetTradePrdRoutingModule {}
