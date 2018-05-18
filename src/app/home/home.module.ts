import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { AdvertisementComponent } from './advertisement/advertisement.component';

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    AdvertisementComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
