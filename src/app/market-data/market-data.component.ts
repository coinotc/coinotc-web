import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CryptoInfoService, CryptoInfo, Crypto } from '../core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { ifError } from "assert";

import { ClrDatagridSortOrder,ClrDatagridComparatorInterface} from '@clr/angular'

class IDComparator implements ClrDatagridComparatorInterface<Crypto>{
    compare(a: Crypto, b: Crypto){
        return a.id - b.id
    }
}
class QuotesComparator implements ClrDatagridComparatorInterface<Crypto>{
    compare(a: Crypto, b: Crypto){
        return a.quotes.USD.price - b.quotes.USD.price
    }   
}
@Component({
    styleUrls: ['./market-data.component.scss'],
    templateUrl: './market-data.component.html',
})
export class MarketDataComponent implements OnInit {

    //sort
    descSort = ClrDatagridSortOrder.DESC;
    private idComparator = new IDComparator()
    private quotesComparator = new QuotesComparator()

    cryptos = []
    private crypto = new Crypto(null,null,null,null,null,null,null,null,null,null)

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.getAllFiveData(52).subscribe(result => {
            this.crypto = result.data
            this.cryptos.push(this.crypto)
        })
        this.getAllFiveData(328).subscribe(result =>{
            this.crypto = result.data
            this.cryptos.push(this.crypto)
        })
        this.getAllFiveData(512).subscribe(result =>{
            this.crypto = result.data
            this.cryptos.push(this.crypto)
        })
        this.getAllFiveData(1027).subscribe(result =>{
            this.crypto = result.data
            this.cryptos.push(this.crypto)
        })
        this.getAllFiveData(2010).subscribe(result =>{
            this.crypto = result.data
            this.cryptos.push(this.crypto)
        })

    }

    getAllFiveData(id): Observable<any> {
        let url = `https://api.coinmarketcap.com/v2/ticker/${id}/`
        return this.http.get(url);
    }
}

