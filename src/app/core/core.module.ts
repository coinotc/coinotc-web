import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  AuthGuard,
  JwtService,
  UserService,
  AdvertisementsService,
  ProfilesService,
  BannerControlService,
  AdvDetailService,
  OrderService,
  KycService,
  GetIpService,
  CurrenciesService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    UserService,
    AdvertisementsService,
    ProfilesService,
    BannerControlService,
    AdvDetailService,
    OrderService,
    KycService,
    GetIpService,
    CurrenciesService
  ],
  declarations: []
})
export class CoreModule {}
