import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { OrderInformation } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class OrderService {
    constructor(private apiService: ApiService) {}

    public getOrders(username, finished) {
        let getURL = `/order/filter?username=${username}&finished=${finished}`;
        return this.apiService.get(getURL);
    }

    public createOrder(order) {
        return this.apiService.post('/order', order);
    }

    public updateOrder(order) {
        return this.apiService.put('/order', order);
    }

    public getByID(_id) {
        let url = `/order/getone?_id=${_id}`;
        return this.apiService.get(url, _id);
    }

    public addRoomKey(roomkey, orderId) {
        let URL = `/order/roomkey?orderId=${orderId}`;
        return this.apiService.patch(URL, { roomkey: roomkey });
    }

    //according to owner to get orders
    getOrderWithHim(profileUser, currentUser): Observable<OrderInformation[]> {
        let url = `/order/tradeWithHim?profileUser=${profileUser}&currentUser=${currentUser}`;
        return this.apiService.get(url);
    }
}
