import { Component, OnInit } from '@angular/core';
import { Advertisement,advertisement } from '../core'
import { ApiService,AdvertisementsService } from '../core'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-create-adv',
  templateUrl: './create-adv.component.html',
  styleUrls: ['./create-adv.component.scss']
})

export class CreateAdvComponent implements OnInit {

  // error : boolean = true
  // min_price : number =0
  // max_price : number =0
  advertisement = new advertisement(null,null,null,null,null,null,null,null,null,null,null,null)
  price:number
  rangepercent = 0;
  
  constructor(private advService : AdvertisementsService,private http:HttpClient,private userService:UserService) { 
    this.advertisement.owner = this.userService.getCurrentUser().username
  }

  ngOnInit() {
    
}
changerange() {
  this.advertisement.price = Number(
    (this.price * (100 + this.rangepercent) / 100).toFixed(4)
  );
}

priceChange(){
  if (this.advertisement.fiat && this.advertisement.crypto){
    switch (this.advertisement.fiat) {
      case 'SGD':
        this.currentPrice(this.advertisement.crypto,'SGD').subscribe(result => {
          console.log(result)
          this.price = Number(result[0].price_sgd);
          this.changerange();
        });
        break;
      case 'CNY':
      this.currentPrice(this.advertisement.crypto,'CNY').subscribe(result => {
        this.price = Number(result[0].price_cny);
        this.changerange();
      });
        break;
      case 'USD':
      this.currentPrice(this.advertisement.crypto,'USD').subscribe(result => {
        this.price = Number(result[0].price_usd);
        this.changerange();
      });
        break;
      case 'KRW':
      this.currentPrice(this.advertisement.crypto,'KRW').subscribe(result => {
        this.price = Number(result[0].price_krw);
        this.changerange();
      });
        break;
    }
  }
}

  currentPrice(crypto,fiat): Observable<any>{
    console.log(this.advertisement.crypto)
    console.log(this.advertisement.fiat)
     let url = `https://api.coinmarketcap.com/v1/ticker/${this.advertisement.crypto}/?convert=${this.advertisement.fiat}`
        return this.http.get(url); 
  }
  

  createAdvertisement(){
    this.advertisement.type = Number(this.advertisement.type)
   console.log(this.advertisement)
   
    this.advService.createAdv(this.advertisement).subscribe(
      result =>{
        console.log(result)
      })
  }
}
