import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Advertisement } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AdvertisementsService {
  constructor(
    private apiService: ApiService
  ) { }


  getAll(type, country, fiat, crypto): Observable<Advertisement[]> {
    return this.apiService.get(`/advertisement/getAll/${type}/${country}/${fiat}/${crypto}`)
    // .pipe(map(data => data.adverts));
  }

  //according to owner to get advertisement
  getByOwner(owner, visible): Observable<Advertisement[]> {
    console.log(owner)
    let url = `/advertisement/myadvertisement?owner=${owner}&visible=${visible}`
    return this.apiService.get(url)
  }

  createAdv(advertisement) {
    return this.apiService.post('/advertisement', advertisement)
  }
  public changeVisible(id, visible) {
    let URL =`/advertisement?_id=${id}`;
    return this.apiService.patch(URL, { visible: visible });
  }


}
