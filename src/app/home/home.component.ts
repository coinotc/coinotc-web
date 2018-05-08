import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User, Advertisement, UserService, AdvertisementsService } from '../core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    private timerSubscription: AnonymousSubscription;
    private getAllSubscription: AnonymousSubscription;
    constructor(
        private router: Router,
        private userService: UserService,
        private advertisementsService: AdvertisementsService
    ) { }
    adverts: Advertisement[];
    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }
    ngOnInit() {
        this.refreshData();
    }
    private subscribeToData(): void {
        this.timerSubscription = Observable.timer(5000)
            .subscribe(() => this.refreshData());
    }
    private refreshData() {
        this.getAllSubscription = this.advertisementsService.getAll()
            .subscribe(adverts => {
                this.adverts = adverts;
                this.subscribeToData();
            })
    }
}
