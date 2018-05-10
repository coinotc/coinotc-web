import { Component, OnInit } from '@angular/core';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.component.html',
  styleUrls: ['./adv-detail.component.scss']
})
export class AdvDetailComponent implements OnInit {

  theAdv:Advertisement

  constructor(private advDetailService:AdvDetailService) {
    this.advDetailService.castAdv.subscribe(result=>{
      this.theAdv = result;
      console.log(result)
    })
   }


  ngOnInit() {
  }

}
