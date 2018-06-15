import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, UserService, AdvDetailService } from '../core';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    private user;
    private activeOrders;
    private finishedOrders;
    status = 'active';
    navigationSubscription;

    constructor(
        private router: Router,
        private orderService: OrderService,
        private userService: UserService,
        private advDetailService: AdvDetailService
    ) {
        this.doRefresh();
    }

    onStatus(orderStatus) {
        this.status = orderStatus;
        this.doRefresh();
    }

    onDetail(order) {
        this.advDetailService.detailId(order._id);
    }

    doRefresh() {
        this.user = this.userService.getCurrentUser();
        switch (this.status) {
            case 'active':
                this.orderService
                    .getOrders(this.user.username, false)
                    .subscribe(result => {
                        this.activeOrders = result;
                        this.router.navigateByUrl('/orders');
                    });
                break;
            case 'finished':
                this.orderService
                    .getOrders(this.user.username, true)
                    .subscribe(result => {
                        this.finishedOrders = result;
                        this.router.navigateByUrl('/orders');
                    });
                break;
        }
    }

    ngOnInit() {}
}
