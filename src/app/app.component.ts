import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../environments/firebase-chat';
import { UserService } from './core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {
        firebase.initializeApp(firebaseConfig);
    }
    ngOnInit() {
        this.userService.populate();
        this.router.navigate(['']);
    }
}
