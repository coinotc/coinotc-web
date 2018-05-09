import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CryptoInfoService,CryptoInfo } from '../core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Component({
    styleUrls: ['./market-data.component.scss'],
    templateUrl: './market-data.component.html',
})
export class MarketDataComponent {

  cryptoInfo : CryptoInfo
  cryptoConvertInfo : CryptoInfo
  
  convert : string
  buttonStyle : boolean = true

  constructor(
    // private cryptoInfoService : CryptoInfoService, 
    private http:HttpClient) {
  
    this.getMarketData(2).subscribe(result => {
      console.log(result)
      this.cryptoInfo = result.data
      console.log(this.cryptoInfo)
    })
    this.getMarketConvertData(2,this.convert).subscribe(result =>{
      console.log(result)
      this.cryptoConvertInfo = result.data
      console.log(this.cryptoConvertInfo)
    })
  }

  getMarketData(id){
    let url = `https://api.coinmarketcap.com/v2/ticker/${id}/`
    return this.http.get<{data:any,metadata:any}>(url);
  }
  getMarketConvertData(id,convert){
    let url = `https://api.coinmarketcap.com/v2/ticker/${id}/?convert=${convert}`
    return this.http.get<{data:any,metadata:any}>(url);
  }

  changeConvert(convert){
    this.convert = convert
  }

}
