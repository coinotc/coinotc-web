import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
  
  login(credentials, ip): Observable<User> {
    return this.apiService
      .post('/users/login', { user: credentials, ip: ip })
      .map(data => {
        console.log('----> setAuth');
        this.setAuth(data.user);
        return data;
      });
  }
  public checkUser(credentials): Observable<number> {
    let URL = '/users/checkUser'
    return this.apiService.post(URL, { user: credentials });
  }
  signUp(credentials,ip): Observable<User> {
    return this.apiService
      .post('/users', { user: credentials, deviceToken: '', tradepassword: credentials.tradepassword, ip: ip })
      .map(data => {
        console.log('----> setAuth');
        this.setAuth(data.user);
        return data;
      });
  }
  // attemptAuth(type, credentials,ip): Observable<User> {
  //   const route = (type === 'login') ? '/login' : '';
  //   return this.apiService.post('/users' + route, {user: credentials,  ip: ip })
  //     .pipe(map(
  //     data => {
  //       this.setAuth(data.user);
  //       return data;
  //     }
  //   ));
  // }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  getUser() :Observable<User>{
    return this.apiService.get('/userInfo');
  }
  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}
