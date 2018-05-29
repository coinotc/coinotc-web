import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Kyc } from '../models';
// import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { catchError } from 'rxjs/operators';

@Injectable()
export class KycService {

  constructor(  
    private apiService: ApiService,
    private http: HttpClient,
   ) { }

  uploadKyc(kyc):Observable<Kyc> {
    console.log(kyc)
    return this.apiService.patch('/users/kyc',kyc)
  }

  uploadImg(file):Observable<Kyc>{
    console.log(file)
   return this.apiService.post('/upload-firestore',file)
 }
}
