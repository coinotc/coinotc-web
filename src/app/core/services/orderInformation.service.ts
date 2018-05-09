import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';
import { ROUTER_CONFIGURATION } from '@angular/router';

@Injectable()
export class OrderInformationService {
  constructor (
    private apiService: ApiService
  ) {}

  getFifteenOrderInfo(fiat,crypto){
    // order/currentOrderInformation?fiat=CNY&crypto=CARDANO
    return this.apiService.get(`/order/currentOrderInformation?fiat=${fiat}&crypto=${crypto}`);
  }
}