import { Component, OnInit ,ElementRef, Input , ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from "@angular/forms";
import { User, UserService, Kyc } from '../core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';
import { KycService } from '../core/services/kyc.service'

@Component({
    selector: 'app-kyc-page',
    templateUrl: './kyc.component.html'
})
export class KycComponent implements OnInit {

    kycForm: FormGroup;
    kyc: Kyc;
    currentUser: User;
    isUser: boolean;
    errors: Object = {};
    loading: boolean= false;
    submitted = false;
    previewImage: any;
    countries:string[]=[
      'China',
      'Singapore',
      'Malaysia',
      'Japan',
      'Korea',
      'Thailand'
    ]
    url1:any
    url2:any
    url3:any
    
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('imgPreview') imgPreview: ElementRef;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private el: ElementRef,
        private fb: FormBuilder,
        private kycService:KycService,
        private router: Router,
        
    ) {   }

   


    ngOnInit() {
        this.route.data.pipe(
            concatMap((data: { kyc: Kyc }) => {
                this.kyc = data.kyc;
                // Load the current user's data.
                return this.userService.currentUser.pipe(tap(
                    (userData: User) => {
                        this.currentUser = userData;
                        this.isUser = (this.currentUser.username === this.kyc.username);
                    }
                ));
            })
        ).subscribe();
        console.dir(this.kyc)
        this.kycForm = new FormGroup({
            firstName:new FormControl('',Validators.required),
            lastName: new FormControl('',Validators.required),
            gender: new FormControl('',Validators.required),
            country: new FormControl('',Validators.required),
            passportID: new FormControl('',Validators.required),
            kycImg:new FormGroup({
                passportCover:new FormControl(''),
                passportPage:new FormControl(''),
                photoAndID:new FormControl('')
            })
        })
        console.log(this.kycForm)
    }
  
   
    onSubmit() {
           this.submitted = true;
        //    const formModel = this.prepareSave();
           this.updateKyc(this.kycForm.value);
           this.kycService.uploadKyc(this.kyc).subscribe(
            updatedKyc => this.router.navigateByUrl('/profile/' + updatedKyc.username),
            err => {
              this.errors = err;
              this.submitted = false;
            //   this.initializeForm();
            }
          );
    }

    updateKyc(values: Object) {
        Object.assign(this.kyc, values);
      }
    
   

    viewCover(event){
        console.log(event)
        if(event.target.files.length > 0){
          let file = event.target.files[0];
          var reader = new FileReader();
          let el = this.imgPreview;
          reader.onloadend = (event: any) => {
            this.url1 = event.target.result;
        }
          reader.readAsDataURL(file);
          this.kycForm.get('passportCover')
        }
      }

      viewPage(event){
        if(event.target.files.length > 0){
          let file = event.target.files[0];
          var reader = new FileReader();
          let el = this.imgPreview;
          reader.onloadend = (event: any) => {
            this.url2 = event.target.result;
        }
          reader.readAsDataURL(file);
          this.kycForm.get('passportPage')
        }
      }

      viewID(event){
        if(event.target.files.length > 0){
          let file = event.target.files[0];
          var reader = new FileReader();
          let el = this.imgPreview;
          reader.onloadend = (event: any) => {
            this.url3 = event.target.result;
        }
          reader.readAsDataURL(file);
          this.kycForm.get('photoAndID')
        }
      }

    // initializeForm(){
    //     this.kycForm = this.fb.group({
    //       remarks: ['', Validators.required],
         
    //     })
    //   }
    //   prepareSave(){
    //     let input = new FormData();
    //     input.append('remarks', this.kycForm.get('remarks').value);
    //     input.append('passportCover', this.kycForm.get('passportCover').value);
    //     return input;
    //   }

}
