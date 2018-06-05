import { Component, OnInit, Input } from '@angular/core';
import { AdvDetailService } from '../../core/services/adv-detail.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @Input('data') list;
  constructor(
    private advDetailService: AdvDetailService,
  ) { }

  ngOnInit() {
    console.log(this.list);
  }
  bors(advertisement) {
    this.advDetailService.detailAdv(advertisement);
  }
}
