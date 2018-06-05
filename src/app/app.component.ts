import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { firebaseConfig } from '../environments/firebase-chat'
import { UserService } from './core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService) {
        firebase.initializeApp(firebaseConfig)
    }
    ngOnInit() {
        this.userService.populate();
    }
}
