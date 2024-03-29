import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { AvatarModule } from 'ngx-avatar';

import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    AvatarModule,
    ClarityModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule {}
