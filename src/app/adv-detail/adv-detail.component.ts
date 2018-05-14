import { Component, OnInit } from '@angular/core';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'
import { OrderInformation } from '../core/models/orderinfo.model'

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.component.html',
  styleUrls: ['./adv-detail.component.scss']
})
export class AdvDetailComponent implements OnInit {

  theAdv: Advertisement
  quantity: number
  amount: number
  disabled = true
  orderinformation = new OrderInformation(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    null
  );


  constructor(private advDetailService: AdvDetailService) {
    this.advDetailService.castAdv.subscribe(result => {
      this.theAdv = result;
      console.log(this.theAdv);
      console.log(this.orderinformation);
      this.orderinformation.price = this.theAdv.price;
    })

    // this.amount = this.quantity*this.theAdv.price
    // console.log(this.quantity)
    // console.log(this.amount)
  }

  amountchange() {
    // console.log(this.orderinformation);
    this.orderinformation.quantity =
      this.orderinformation.amount / this.orderinformation.price;
    this.checkorder();
  }
  quantitychange() {
    this.orderinformation.amount =
      this.orderinformation.quantity * this.orderinformation.price;
    this.checkorder();
  }
  checkorder() {
    if (this.orderinformation.amount >= this.theAdv.min_price) {
      if (this.orderinformation.amount <= this.theAdv.max_price) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    } else {
      this.disabled = true;
    }
  }






  ngOnInit() {
  }

}
