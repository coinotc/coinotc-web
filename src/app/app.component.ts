import { Component, OnInit } from '@angular/core';

import { UserService } from './core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService) {
    }

    ngOnInit() {
    this.userService.populate();
  }
}
