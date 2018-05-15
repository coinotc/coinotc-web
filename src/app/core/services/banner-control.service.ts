import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { banner } from '../models/banner.model'

@Injectable()
export class BannerControlService {

  constructor(private apiService: ApiService) {
  }

 getBanner(): Observable<banner> {
    let url = '/banner';
    return this.apiService.get(url);
  }

}
