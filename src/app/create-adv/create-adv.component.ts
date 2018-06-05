import { Component, OnInit } from '@angular/core';
import { Advertisement,advertisement } from '../core'
import { ApiService,AdvertisementsService } from '../core'

@Component({
  selector: 'app-create-adv',
  templateUrl: './create-adv.component.html',
  styleUrls: ['./create-adv.component.scss']
})

export class CreateAdvComponent implements OnInit {

  // error : boolean = true
  // min_price : number =0
  // max_price : number =0
  advertisement = new advertisement(null,null,null,null,null,null,null,null,null,null,null,null)
  
  constructor(private advService : AdvertisementsService) { }

  ngOnInit() {

  }

  createAdvertisement(){
    this.advertisement.type = Number(this.advertisement.type)
   console.log(this.advertisement)
   
  //   this.advService.createAdv(this.advertisement).subscribe(
  //     result =>{
  //       console.log(result)
  //     })
  }
}
