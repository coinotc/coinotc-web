import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Advertisement } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AdvertisementsService {
  constructor (
    private apiService: ApiService
  ) {}


  getAll(): Observable<Advertisement[]> {
    return this.apiService.get('/advertisement/getAll')
         // .pipe(map(data => data.adverts));
  }

  createAdv(advertisement){
    return this.apiService.post('/advertisement',advertisement)
  }



}
