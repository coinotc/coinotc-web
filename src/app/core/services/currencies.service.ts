import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable()
export class CurrenciesService {

  constructor(public apiService: ApiService) { }
  getCurrencies() {
    return this.apiService.getExternal('../../../assets/data/currencies.json');
  }
}
