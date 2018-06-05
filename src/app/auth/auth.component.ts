import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService, GetIpService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;
  ip = {
    "zip": "",
    "timezone": "Asia/Shanghai",
    "status": "success",
    "regionName": "Shanghai",
    "region": "SH",
    "query": "183.195.10.9",
    "org": "Shanghai Mobile Communications Co.,Ltd.",
    "lon": 121.3997,
    "lat": 31.0456,
    "isp": "China Mobile Guangdong",
    "countryCode": "CN",
    "country": "China",
    "city": "Shanghai",
    "as": "AS24400 Shanghai Mobile Communications Co.,Ltd."
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private getIpService: GetIpService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('confirmPassword', new FormControl());
        this.authForm.addControl('tradepassword', new FormControl());
        this.authForm.addControl('confirmTradePassword', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} }
    const credentials = this.authForm.value;
    if (this.authType == "login") {
      this.getIpService.getIP().subscribe(ip => {
        this.userService
          .login(credentials, ip)
          .subscribe(
            data => this.router.navigateByUrl('/'),
            err => {
              //console.log(err)
              this.errors = err;
              //console.log(this.errors+"hello")
              this.isSubmitting = false;
            }
          );
      })
    } else {
      this.userService.checkUser(credentials).subscribe(result => {
        console.log(result)
        if (result != 0) {
          this.errors = { errors: { '': 'email or username have been taken' } }
        } else {
          this.getIpService.getIP().subscribe(ip => {
            this.userService.signUp(credentials, ip).subscribe(
              data => this.router.navigateByUrl('/'),
              err => {
                this.errors = err;
                this.isSubmitting = false;
              })
          })
        }
      })
    }
  }
}
