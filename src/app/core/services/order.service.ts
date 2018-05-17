import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { OrderInformation } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class OrderService {
  constructor (
    private apiService: ApiService
  ) {}

  //according to owner to get orders
  getByOwner(owner): Observable<OrderInformation[]>{
    return this.apiService.get('/order/byOwner/')
  }

}
