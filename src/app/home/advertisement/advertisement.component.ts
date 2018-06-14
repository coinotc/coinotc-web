import { Component, OnInit, Input } from '@angular/core';
import { AdvDetailService } from '../../core/services/adv-detail.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @Input('data') list;
  @Input() counrty;
  flag = false;
  constructor(
    private advDetailService: AdvDetailService,
  ) { }
  ngOnChanges() {
    if (this.counrty == 'global') {
      this.flag = true;
    }else{
      this.flag = false;
    }
  }

  ngOnInit() {
  }
  bors(advertisement) {
    this.advDetailService.detailAdv(advertisement);
  }
}
