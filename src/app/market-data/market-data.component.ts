import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CryptoInfoService, CryptoInfo } from '../core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Component({
    styleUrls: ['./market-data.component.scss'],
    templateUrl: './market-data.component.html',
})
export class MarketDataComponent {

    cryptoInfo: Array<any>
    cryptoConvertInfo: CryptoInfo

    constructor(
        // private cryptoInfoService : CryptoInfoService,
        private http: HttpClient) {

        this.getMarketData().subscribe(result => {
            console.log(result.data)
            this.cryptoInfo = result.data
            console.log(this.cryptoInfo)
        })
        this.getMarketConvertData(2, 'BCH').subscribe(result => {
            console.log(result)
            this.cryptoConvertInfo = result.data
            console.log(this.cryptoConvertInfo)
        })
    }

    getMarketData(): Observable<any> {
        let url = `https://api.coinmarketcap.com/v2/listings/`
        return this.http.get(url);
    }
    getMarketConvertData(id, convert) {
        let url = `https://api.coinmarketcap.com/v2/ticker/${id}/?convert=${convert}`
        return this.http.get<{ data: any, metadata: any }>(url);
    }
}
