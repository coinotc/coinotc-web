import { Component, OnInit } from '@angular/core';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'
import { OrderInformation } from '../core/models/orderinfo.model'
import { OrderService } from '../core/services/order.service'



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  Order:OrderInformation
  theId
  
  constructor(private advDetailService: AdvDetailService,private orderService:OrderService){
   this.advDetailService.castId.subscribe(result=>{
     if(result){
       console.log(result)
       this.theId = result
       this.orderService.getByID(this.theId).subscribe(result=>{
        this.Order = result
        console.log(result)
      })
     }
   })
 
  }

  

  ngOnInit() {
  }

}
