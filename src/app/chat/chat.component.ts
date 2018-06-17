import { Component, OnInit } from '@angular/core';
import {
    OrderService,
    UserService,
    AdvDetailService,
    ProfilesService
} from '../core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    user;
    trader;
    order;
    theId;
    data = { type: '', name: '', message: '', roomname: '' };
    message = { content: '', date: null, role: '' };
    chats = [];
    roomkey: any;
    rateResult: RatingChangeEvent;

    constructor(
        private router: Router,
        private advDetailService: AdvDetailService,
        private orderService: OrderService,
        private userService: UserService,
        private profilesService: ProfilesService
    ) {
        this.user = this.userService.getCurrentUser();
        this.advDetailService.castId.subscribe(result => {
            if (result) {
                console.log(result);
                this.theId = result;
                this.orderService.getByID(this.theId).subscribe(result => {
                    this.order = result;
                    console.log(result);
                    this.data.roomname = result._id;
                    this.data.type = 'message';
                    this.data.name = this.user.username;
                    this.roomkey = result.roomkey;
                    var start = new Date().getTime();
                    firebase
                        .database()
                        .ref('chatrooms/' + result.roomkey + '/chats')
                        //.limitToLast(10)
                        .on('value', resp => {
                            this.chats = [];
                            this.chats = snapshotToArray(resp);
                            console.log(this.chats);
                            var end = new Date().getTime();
                            console.log(end - start);
                        });
                    if (this.user.username == this.order.seller) {
                        this.trader = this.order.buyer;
                    } else {
                        this.trader = this.order.seller;
                    }
                });
            }
        });
    }

    onInformed() {
        this.order.finished = 2;
        this.orderService.updateOrder(this.order).subscribe(result => {
            this.orderService.getByID(this.order._id).subscribe(result => {
                this.order = result;
            });
        });
    }

    onFinished() {
        this.order.finished = 3;
        this.orderService.updateOrder(this.order).subscribe(result => {
            this.orderService.getByID(this.order._id).subscribe(result => {
                this.order = result;
            });
        });
    }

    rateChanged = ($event: RatingChangeEvent) => {
        console.log('onRatingUpdated $event: ', $event);
        this.rateResult = $event;
        console.log(this.rateResult.rating);
    };

    onRating() {
        console.log('>>>>>');
        this.orderService.getByID(this.order._id).subscribe(result => {
            this.order = result;
            if (this.user.username == this.order.buyer) {
                this.order.buyerRating = this.rateResult.rating;
                if (this.order.sellerRating !== null) {
                    this.order.finished = 0;
                }
            } else if (this.user.username == this.order.seller) {
                this.order.sellerRating = this.rateResult.rating;
                if (this.order.buyerRating !== null) {
                    this.order.finished = 0;
                }
            }
            this.orderService.updateOrder(this.order).subscribe(result => {
                console.log(result);
            });
        });
        this.profilesService.getProfile(this.trader).subscribe(result => {
            console.log(result);
            let ratings = result[0].ratings;
            ratings.push(this.rateResult.rating);
            this.profilesService.sendRating(this.trader, ratings).subscribe();
        });
    }

    quit() {
        this.router.navigateByUrl('/orders');
    }

    sendMessage() {
        //this.data.message = this.leaveMess;
        if (this.data.message.trim() != '') {
            let newData = firebase
                .database()
                .ref('chatrooms/' + this.roomkey + '/chats')
                .push();
            newData.set({
                type: this.data.type,
                user: this.user.username,
                message: this.data.message,
                sendDate: Date()
            });
            this.data.message = '';
            //this.scrollToBottom();
        }
    }

    ngOnInit() {}
}

export const snapshotToArray = snapshot => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
