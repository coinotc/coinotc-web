import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Kyc } from '../models';

@Injectable()
export class KycService {

  constructor(  
    private apiService: ApiService,
    private http: HttpClient) { }

  uploadKyc(){
    this.apiService.post('/users/kyc',)
  }


}
