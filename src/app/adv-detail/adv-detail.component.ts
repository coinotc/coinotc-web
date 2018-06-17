import { Component, OnInit } from '@angular/core';
import { AdvDetailService } from '../core/services/adv-detail.service';
import { Advertisement } from '../core/models/advertisment.model';
import { Router } from '@angular/router';
import { OrderInformation } from '../core/models/orderinfo.model';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { OrderService } from '../core/services/order.service';
import { AdvertisementsService } from '../core/services/advertisements.service';
import { UserService } from '../core/services/user.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-adv-detail',
    templateUrl: './adv-detail.component.html',
    styleUrls: ['./adv-detail.component.scss']
})
export class AdvDetailComponent implements OnInit {
    theAdv;
    ref = firebase.database().ref('chatrooms/');
    roomkey: any;
    data = { type: '', name: '', message: '', roomname: '' };
    specificId: string;
    quantity: number;
    amount: number;
    disabled = true;
    tradetype: { type: String; crypto: String };
    orderinformation = new OrderInformation(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1,
        null,
        null
    );

    constructor(
        private advDetailService: AdvDetailService,
        private orderService: OrderService,
        private userservice: UserService, private toastyService: ToastyService,
        private router: Router,
        private advertisementsService: AdvertisementsService
    ) {
        this.advDetailService.castAdv.subscribe(result => {
            this.theAdv = result;
            console.log(this.theAdv);
            this.orderinformation.price = this.theAdv.price;
        });

        this.advDetailService.castId.subscribe(result => {
            this.specificId = result;
        });
    }

    amountchange() {
        // console.log(this.orderinformation);
        this.orderinformation.quantity =
            this.orderinformation.amount / this.orderinformation.price;
        this.checkorder();
    }
    quantitychange() {
        this.orderinformation.amount =
            this.orderinformation.quantity * this.orderinformation.price;
        this.checkorder();
    }
    checkorder() {
        if (this.orderinformation.amount >= this.theAdv.min_price) {
            if (this.orderinformation.amount <= this.theAdv.max_price) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        } else {
            this.disabled = true;
        }
    }

    makeOrder() {
        if (this.userservice.getCurrentUser().username) {
            this.orderinformation.crypto = this.theAdv.crypto;
            this.orderinformation.country = this.theAdv.country;
            this.orderinformation.fiat = this.theAdv.fiat;
            this.orderinformation.payment = this.theAdv.payment;
            this.orderinformation.limit = this.theAdv.limit;
            this.orderinformation.message = this.theAdv.message;
            this.orderinformation.owner = this.theAdv.owner;
            this.orderinformation.adid = this.theAdv._id;
            if ((this.theAdv.type = 1)) {
                this.orderinformation.seller = this.userservice.getCurrentUser().username;
                this.orderinformation.buyer = this.theAdv.owner;
            } else {
                this.orderinformation.buyer = this.userservice.getCurrentUser().username;
                this.orderinformation.seller = this.theAdv.owner;
            }
            this.orderService
                .createOrder(this.orderinformation)
                .subscribe(result => {
                    this.advDetailService.detailId(result._id);
                    let owner = this.theAdv.owner;
                    this.data.name = this.userservice.getCurrentUser().username;
                    this.data.roomname = JSON.parse(JSON.stringify(result))._id;
                    let newData = this.ref.push();
                    newData.set({
                        roomname: this.data.roomname
                    }); //定义房间名 并创建房间
                    this.roomkey = getRoomKey(this.ref);
                    console.log(this.roomkey);
                    console.log(result);
                    this.orderService
                        .addRoomKey(this.roomkey, this.data.roomname)
                        .subscribe(() => {
                            this.router.navigate(['/chat']);
                        }
                        );
                });
        } else {
            var tosatyoption: ToastOptions = {
                title: "Warning",
                msg: "You need login to make a order!",
                showClose: true,
                timeout: 5000,
                theme: 'bootstrap'
            }
            this.toastyService.warning(tosatyoption);
        }
    }

    ngOnInit() { }
}
export const getRoomKey = ref => {
    let roomkey;
    ref.limitToLast(1).on('child_added', function (prevChildKey) {
        roomkey = prevChildKey.key;
    }); //获取roomkey
    return roomkey;
};
