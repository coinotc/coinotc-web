import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User, Advertisement, UserService, AdvertisementsService } from '../core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { OrderInformationService } from '../core/services/orderInformation.service';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BannerControlService } from '../core/services/banner-control.service'
import { banner } from '../core/models/banner.model'
import { AdvDetailService } from '../core/services/adv-detail.service'

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  banners
  adverts: Advertisement[];
  specificAdv:Advertisement

  private timerSubscription: AnonymousSubscription;
  private getAllSubscription: AnonymousSubscription;

  selectedFiat: String = "CNY";
  selectedCrypto: String = "CARDANO";
  orders;
  flag = 0;
  //chart set
 

  public lineChartData:Array<any> = [
    {data: [], label: ''}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    private router: Router,
    private userService: UserService,
    private advertisementsService: AdvertisementsService,
    private orderInformationService :OrderInformationService,
    private bannerControlService:BannerControlService,
    private advDetailService:AdvDetailService
  ) {
      this.orderInformationService.getFifteenOrderInfo(this.selectedFiat,this.selectedCrypto).subscribe(result => {
         this.orders = result;
      });
      this.bannerControlService.getBanner().subscribe(result=>{
        this.banners = result;
        console.log(result)
      });
      this.advDetailService.castAdv.subscribe(result=>{
        this.specificAdv = result
      })
      
  }
  //chart event
  public chartHovered(e:any):void {
    console.log(e);
  }

   
   
  

  onEdit(advert){
    this.advDetailService.detailAdv(advert)
  }
   
  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
  ngOnInit() {
    this.refreshData();
    this.refreshTrades();
    //chart
    this.refreshChart();
  }
  changefiat(fiat){
    this.selectedFiat = fiat;
    this.orderInformationService.getFifteenOrderInfo(fiat,this.selectedCrypto).subscribe(result => {
      this.orders = result;
    });
    // this.flag = 0;
    // this.orderInformationService.getOrderChart(fiat,this.selectedCrypto)
    // .subscribe(result => {
    //   for(let i=0;i<result.length;i++){
    //     this.lineChartData[0].data.push(result[i].amount);
    //     this.lineChartLabels.push(result[i].approveDate);
    //   } 
    //   this.lineChartData[0].label = fiat;
    //   this.flag=1;
    // });
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
  subscribeToChart(){
    this.timerSubscription = Observable.timer(5000)
      .subscribe(() => this.refreshChart());
  }

  private refreshData() {
    this.getAllSubscription = this.advertisementsService.getAll()
      .subscribe(adverts => {
        this.adverts = adverts;
        console.log(this.adverts)
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
  private refreshChart(){
    this.lineChartData[0].data = [];
    this.getAllSubscription = this.orderInformationService.getOrderChart(this.selectedFiat,this.selectedCrypto)
    .subscribe(result => {
      for(let i=0;i<result.length;i++){
        this.lineChartData[0].data.push(result[i].amount);
        this.lineChartLabels.push(result[i].approveDate);
      } 
      this.lineChartData[0].label = this.selectedFiat;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      this.flag = 1;
      this.subscribeToChart();
    })
  }
}
