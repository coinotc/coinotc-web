import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advertisement, advertisement } from '../core'
import { ApiService, AdvertisementsService } from '../core'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { validateConfig } from '@angular/router/src/config';
import { UserService } from '../core';

@Component({
  selector: 'app-create-adv',
  templateUrl: './create-adv.component.html',
  styleUrls: ['./create-adv.component.scss']
})

export class CreateAdvComponent implements OnInit {
  adform: FormGroup;
  advertisement = new advertisement(null, null, null, null, null, null, null, null, null, null, null, 1)
  price: number; cryptoprice: number;
  rangepercent = 0;

  constructor(private advService: AdvertisementsService, private http: HttpClient, private fb: FormBuilder, private user: UserService) {
    this.changetype();
  }
  changetype() {
    if (this.advertisement.type == 1) {
      this.adform = this.fb.group({
        crypto: [this.advertisement.crypto, Validators.required],
        country: [this.advertisement.country, Validators.required],
        fiat: [this.advertisement.fiat, Validators.required],
        price: [this.cryptoprice, [Validators.min(0)]],
        min_price: [null, [Validators.min(0), Validators.required]],
        max_price: [null, [Validators.min(0), Validators.required]],
        payment: ['', Validators.required],
        limit: [
          null,
          [Validators.min(15), Validators.max(60), Validators.required]
        ],
        message: ['', Validators.required]
      });
    } else {
      this.adform = this.fb.group({
        crypto: [this.advertisement.crypto, Validators.required],
        country: [this.advertisement.country, Validators.required],
        fiat: [this.advertisement.fiat, Validators.required],
        price: [this.cryptoprice, [Validators.min(0)]],
        min_price: [null, [Validators.min(0), Validators.required]],
        max_price: [null, [Validators.min(0), Validators.required]],
        payment: ['', Validators.required],
        limit: [null, [Validators.min(15), Validators.max(60)]],
        message: ['', Validators.required]
      });
    }
    // this.fiatchange();
    this.priceChange();
  }

  ngOnInit() {

  }
  changerange() {
    this.advertisement.price = Number(
      (this.price * (100 + this.rangepercent) / 100).toFixed(4)
    );
  }

  priceChange() {
    if (this.advertisement.fiat && this.advertisement.crypto) {
      switch (this.advertisement.fiat) {
        case 'SGD':
          this.currentPrice(this.advertisement.crypto, 'SGD').subscribe(result => {
            console.log(result)
            this.price = Number(result[0].price_sgd);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
        case 'CNY':
          this.currentPrice(this.advertisement.crypto, 'CNY').subscribe(result => {
            this.price = Number(result[0].price_cny);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
        case 'USD':
          this.currentPrice(this.advertisement.crypto, 'USD').subscribe(result => {
            this.price = Number(result[0].price_usd);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
        case 'KRW':
          this.currentPrice(this.advertisement.crypto, 'KRW').subscribe(result => {
            this.price = Number(result[0].price_krw);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
        case 'MYR':
          this.currentPrice(this.advertisement.crypto, 'MYR').subscribe(result => {
            this.price = Number(result[0].price_myr);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
        case 'THB':
          this.currentPrice(this.advertisement.crypto, 'THB').subscribe(result => {
            this.price = Number(result[0].price_thb);
            this.cryptoprice = this.price;
            this.changerange();
          });
          break;
      }
    }
  }

  currentPrice(crypto, fiat): Observable<any> {
    console.log(this.advertisement.crypto)
    console.log(this.advertisement.fiat)
    let url = `https://api.coinmarketcap.com/v1/ticker/${this.advertisement.crypto}/?convert=${this.advertisement.fiat}`
    return this.http.get(url);
  }


  createAdvertisement() {
    this.advertisement.type = Number(this.advertisement.type);
    this.advertisement.owner = this.user.getCurrentUser().username;
    this.advertisement.visible = true;
    console.log(this.advertisement)

    this.advService.createAdv(this.advertisement).subscribe(
      result =>{
        console.log(result)
      })
  }
}
