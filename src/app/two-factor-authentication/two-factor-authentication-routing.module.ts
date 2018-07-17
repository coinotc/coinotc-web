import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication.component';

const routes: Routes = [
  {
    path: '',
    component: TwoFactorAuthenticationComponent,
  //   resolve: {
  //     isAuthenticated: ForgetTradePrdAuthResolver
  // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoFactorAuthenticationRoutingModule {}
