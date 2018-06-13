import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'
import { OrderInformation } from '../core/models/orderinfo.model'
import { UserService } from '../core/services/user.service';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

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
    null,
    null
  );


  constructor(private advDetailService: AdvDetailService, private router: Router, private user: UserService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.advDetailService.castAdv.subscribe(result => {
      this.theAdv = result;
      console.log(this.theAdv);
      console.log(this.orderinformation);
      this.orderinformation.price = this.theAdv.price;
    })
    this.toastyConfig.theme = 'bootstrap';

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
  makeorder() {
    if (this.user.getCurrentUser().username) {
      this.orderinformation.country = this.theAdv.country;
      this.orderinformation.crypto = this.theAdv.crypto;
      this.orderinformation.fiat = this.theAdv.fiat;
      this.orderinformation.message = this.theAdv.message;
      this.orderinformation.payment = this.theAdv.payment;
      this.orderinformation.limit = this.theAdv.limit;
      this.orderinformation.owner = this.theAdv.owner;
      this.orderinformation.adid = this.theAdv._id;
    } else {
      var tosatyoption: ToastOptions = {
        title: "Warning",
        msg: "You need login to make a order!",
        showClose: true,
        timeout: 5000,
        theme: 'default',
        onRemove: () => {
          this.router.navigate(['/login']);
        }
      }
      this.toastyService.warning(tosatyoption);
    }
    console.log(this.orderinformation);
    console.log(this.theAdv);
  }






  ngOnInit() {
  }

}
