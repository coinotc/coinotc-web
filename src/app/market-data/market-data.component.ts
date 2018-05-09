import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CryptoInfoService, CryptoInfo } from '../core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { ifError } from "assert";

@Component({
    styleUrls: ['./market-data.component.scss'],
    templateUrl: './market-data.component.html',
})
export class MarketDataComponent {

  fiveData : Array<any>
  cryptoInfo =[]as Array<CryptoInfo>
  cryptoConvertInfo: CryptoInfo
  crypto : CryptoInfo

  constructor(
        // private cryptoInfoService : CryptoInfoService,
        private http: HttpClient) {

        // this.getMarketData().subscribe(result => {
        //     console.log(result.data)
        //     this.cryptoInfo = result.data
        //     console.log(this.cryptoInfo)
        //     console.log(this.cryptoInfo.length)
        //     console.log(typeof this.cryptoInfo)
        //     for (let i=0; i<this.cryptoInfo.length; i++) {
        //       // copy.push(items[i])
        //       if (i==51||i==327||i==511||i==1026||i==2009) {
        //         this.fiveData.push(this.cryptoInfo[i])
        //         console.log(this.fiveData.length)
        //       } else {
        //         //
        //       }
        //      }
        // })
        // this.getMarketConvertData(2, 'BCH').subscribe(result => {
        //     console.log(result)
        //     this.cryptoConvertInfo = result.data
        //     console.log(this.cryptoConvertInfo)
        // })

        this.getAllFiveData(52).subscribe(result => {
          this.crypto = result.data
        })

        
        // this.cryptoInfo.forEach((crypto,index) => {
        //   if (index==52||index==328||index==512||index==1027||index==2010) {
        //     this.fiveData.push(crypto)
        //     console.log(this.fiveData.length)
        //   } else {
        //     //
        //   }
        // })
      }

    // getMarketData(): Observable<any> {
    //     let url = `https://api.coinmarketcap.com/v2/listings/`
    //     // let url = `https://api.coinmarketcap.com/v2/ticker/${id}/`
    //     return this.http.get(url);
    // }

    getAllFiveData(id):Observable<any> {
      let url = `https://api.coinmarketcap.com/v2/ticker/${id}/`
      return this.http.get(url);
  }
    // getMarketConvertData(id, convert) {
    //     let url = `https://api.coinmarketcap.com/v2/ticker/${id}/?convert=${convert}`
    //     return this.http.get<{ data: any, metadata: any }>(url);
    // }

}
