import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User,Advertisement, UserService, AdvertisementsService } from '../core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { OrderInformationService } from '../core/services/orderInformation.service';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {Chart} from 'chart.js';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private timerSubscription: AnonymousSubscription;
  private getAllSubscription: AnonymousSubscription;
  adverts: Advertisement[];
  selectedFiat: String = "CNY";
  selectedCrypto: String = "CARDANO";
  orders;
  //chart
  chart = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private advertisementsService: AdvertisementsService,
    private orderInformationService :OrderInformationService,
  ) {
      this.orderInformationService.getFifteenOrderInfo(this.selectedFiat,this.selectedCrypto).subscribe(result => {
        this.orders = result;
      });
  }
  
//   ctx = document.getElementById('myChart').getContext('2d');
//   chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45],
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });
  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
  ngOnInit() {
    this.refreshData();
    this.refreshTrades();
    
  }
  changefiat(fiat){
    this.selectedFiat = fiat;
    this.orderInformationService.getFifteenOrderInfo(fiat,this.selectedCrypto).subscribe(result => {
      this.orders = result;
    });
  }
  changecrypto(crypto){
    this.selectedCrypto = crypto;
    this.orderInformationService.getFifteenOrderInfo(this.selectedFiat,crypto).subscribe(result => {
      this.orders = result;
    });
  }
  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000)
      .subscribe(() => this.refreshData());
  }
  private subscribeToTrades(): void {
    this.timerSubscription = Observable.timer(5000)
      .subscribe(() => this.refreshTrades());
  }
  private refreshData(){
    this.getAllSubscription = this.advertisementsService.getAll()
      .subscribe(adverts =>{
        this.adverts = adverts;
        this.subscribeToData();
      })
  }
  private refreshTrades(){
    this.getAllSubscription = this.orderInformationService.getFifteenOrderInfo(this.selectedFiat,this.selectedCrypto)
    .subscribe(result => {
      this.orders = result;
      this.subscribeToTrades();
    })
  }
}
