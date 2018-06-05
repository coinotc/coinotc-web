import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Advertisement } from '../models/advertisment.model'

@Injectable()
export class AdvDetailService {

  private specificAdv = new BehaviorSubject<Advertisement>(null)
  castAdv = this.specificAdv.asObservable()

  constructor(private apiService:ApiService) { }

  detailAdv(theAdv){
    this.specificAdv.next(theAdv)
  }


}
