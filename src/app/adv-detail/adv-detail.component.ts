import { Component, OnInit } from '@angular/core';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'
import { OrderInformation } from '../core/models/orderinfo.model'
import { OrderService } from '../core/services/order.service'
import { AdvertisementsService } from '../core/services/advertisements.service'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.component.html',
  styleUrls: ['./adv-detail.component.scss']
})
export class AdvDetailComponent implements OnInit {

  theAdv: Advertisement
  specificId:string
  quantity: number
  amount: number
  disabled = true
  tradetype: { type: String; crypto: String };
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


  constructor(private advDetailService: AdvDetailService,
    private orderService:OrderService,private userservice:UserService,
    private advertisementsService:AdvertisementsService) {
    this.advDetailService.castAdv.subscribe(result => {
      this.theAdv = result;
      console.log(this.theAdv);
      this.orderinformation.price = this.theAdv.price;
    })

   this.advDetailService.castId.subscribe(result=>{
     this.specificId = result
   })
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

  makeOrder(){
    this.orderService.createOrder(this.orderinformation).subscribe(result=>{
      if(result){
      this.orderinformation.crypto = this.theAdv.crypto;
      this.orderinformation.country = this.theAdv.country;
      this.orderinformation.fiat = this.theAdv.fiat;
      this.orderinformation.payment = this.theAdv.payment;
      this.orderinformation.limit = this.theAdv.limit;
      this.orderinformation.message = this.theAdv.message;
      this.orderinformation.owner = this.theAdv.owner;
      if (this.theAdv.type = 1) {
        this.orderinformation.buyer = this.userservice.getCurrentUser().username;
        this.orderinformation.seller = this.theAdv.owner;
      } else {
        this.orderinformation.seller = this.userservice.getCurrentUser().username;
        this.orderinformation.buyer = this.theAdv.owner;
      }
      this.orderService.createOrder(this.orderinformation).subscribe(result=>{
        console.log(result)
        this.advDetailService.detailId(result._id)
      })
     
      
      }
  
    })
  }

 
  ngOnInit() {
  }

}
