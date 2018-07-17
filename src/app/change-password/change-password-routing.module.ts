import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
  //   resolve: {
  //     isAuthenticated: ForgetTradePrdAuthResolver
  // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {}
