import { Component, OnInit ,ElementRef, Input , ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from "@angular/forms";
import { User, UserService, Kyc } from '../core';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';

@Component({
    selector: 'app-kyc-page',
    templateUrl: './kyc.component.html'
})
export class KycComponent implements OnInit {

    kycForm: FormGroup;
    loading: boolean= false;
    previewImage: any;
    countries:string[]=[
      'China',
      'Singapore',
      'Malaysia',
      'Japan',
      'Korea',
      'Thailand'
    ]
    
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('imgPreview') imgPreview: ElementRef;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private el: ElementRef,
        private fb: FormBuilder
    ) { }

    kyc: Kyc;
    currentUser: User;
    isUser: boolean;


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
        // console.dir(this.profile.verifystatus)
    }
    employeeAddressForm = new FormGroup({
        fullName: new FormControl('', Validators.required),
        address: new FormGroup({
            postalCode: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required)
        })
    });
    submitted = false;

    onSubmit() {
           
    }
    addNewEmployeeAddress() {
        this.employeeAddressForm.reset();
        this.submitted = false;
    }

    onChange(event){
        if(event.target.files.length > 0){
          let file = event.target.files[0];
          var reader = new FileReader();
          let el = this.imgPreview;
          reader.onloadend = function(e){
            el.nativeElement.src = reader.result;
          };
          reader.readAsDataURL(file);
          this.kycForm.get('coverThumbnail').setValue(file);
        }
      }


}
