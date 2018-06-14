import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User, Advertisement, UserService, AdvertisementsService } from '../core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
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

  constructor(
    private router: Router,
    private userService: UserService,
    private advertisementsService: AdvertisementsService,
    private bannerControlService:BannerControlService,
    private advDetailService:AdvDetailService
  ) {
    this.bannerControlService.getBanner().subscribe(result=>{
      this.banners = result;
      console.log(result)
    });
    this.advDetailService.castAdv.subscribe(result=>{
      this.specificAdv = result
    })
  }

  onEdit(advert){
    this.advDetailService.detailAdv(advert)
  }
  ngOnInit() {
    this.refreshData();
  }
  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000)
      .subscribe(() => this.refreshData());
  }
  private refreshData() {
    this.getAllSubscription = this.advertisementsService.getAll()
      .subscribe(adverts => {
        this.adverts = adverts;
        // console.log(this.adverts)
        this.subscribeToData();
      })
  }
}
