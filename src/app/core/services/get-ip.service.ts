import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ApiServiceProvider } from '../api-service/api-service';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GetIpService {

  constructor(private apiService:ApiService) { }


  public getIP():Observable<any>{
    return this.apiService.getExternal("http://ip-api.com/json")
  }
}
