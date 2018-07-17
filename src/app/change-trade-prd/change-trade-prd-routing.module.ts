import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeTradePrdComponent } from './change-trade-prd.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeTradePrdComponent,
  //   resolve: {
  //     isAuthenticated: ForgetTradePrdAuthResolver
  // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeTradePrdRoutingModule {}
