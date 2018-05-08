import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

import { CryptoInfo } from '../../core';

import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Injectable()
export class CryptoInfoService {
  
    // private url ='https://api.coinmarketcap.com/v2/ticker/';

    constructor ( private apiService: ApiService) {}

    public getCryptoInfo(id: number):Observable<CryptoInfo>{
        // let cryptoUrl = `${this.url}${id}/?convert=${convert}`
        return this.apiService.get('/marketdata/getData/' + id);
    }
}