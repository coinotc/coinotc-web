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

  uploadImg(fileModel: any){
    console.log(fileModel)
   return this.apiService.post('/users/upload-firestore',fileModel)
 }
//  private handleError<T> (operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     this.addToastMessage("Error", JSON.stringify(error.error));
//     return Observable.throw(error  || 'backend server error');
//   };
// }
// addToastMessage(title, msg) {
//   let toastOptions: ToastOptions = {
//       title: title,
//       msg: msg,
//       showClose: true,
//       timeout: 3500,
//       theme: 'bootstrap',
//       onAdd: (toast: ToastData) => {
//           console.log('Toast ' + toast.id + ' has been added!');
//       },
//       onRemove: function(toast: ToastData) {
//           console.log('Toast ' + toast.id + ' has been removed!');
//       }
//   };
//   this.toastyService.error(toastOptions);
// }
}
