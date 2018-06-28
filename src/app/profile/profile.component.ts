import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    User,
    UserService,
    Profile,
    AdvertisementsService,
    Advertisement,
    OrderInformation,
    OrderService,
    advertisement,
    AdvDetailService,
    ProfilesService
} from '../core';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: './profile.component.scss',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    profile: Profile;
    currentUser: User;
    isUser: boolean;
    profiles: Profile[];
    adverts: Advertisement[];
    orderLists: OrderInformation[];
    status = 'basciInformation';
    user: User;
    profileUser: User;
    advertisementInfo;

    adform: FormGroup;
    payment = {
        paypal: false,
        bank: false,
        alipay: false,
        wechatPay: false
    }
    cryptoprice: Number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private advServise: AdvertisementsService,
        private orderService: OrderService,
        private advDetailService: AdvDetailService,
        private profilesService: ProfilesService,
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        this.userService.getUser().subscribe(result => {
            this.user = result;
            console.log(this.user)
        })
    }

    onStatus(profileStatus) {
        this.status = profileStatus;
        this.router.navigateByUrl(`/profile/${this.user.username}`);
    }

    ngOnInit() {
        this.userService.getUser().subscribe(result => {
            this.user = result;
            console.log(this.user)
        })
        this.route.data
            .pipe(
                concatMap((data: { profile: Profile }) => {
                    this.profile = data.profile;
                    // Load the current user's data.
                    return this.userService.currentUser.pipe(
                        tap((userData: User) => {
                            this.currentUser = userData;
                            this.isUser =
                                this.currentUser.username ===
                                this.profile.username;
                        })
                    );
                })
            )
            .subscribe();
        //console.dir(this.profile);
        // console.dir(this.profile.verifystatus)

        console.log(this.currentUser.username);

    }

    getAdvertisement(profileStatus, type) {
        this.advServise
            .getByOwner(this.currentUser.username, type)
            .subscribe(result => {
                this.adverts = result;
                this.status = profileStatus;
                this.router.navigateByUrl(`/profile/${this.user.username}`);
                console.log(this.adverts);
            });
    }
    getfollow(profileStatus, type) {
        let follow = []
        if (type == true) {
            follow = this.currentUser.following;
        } else {
            follow = this.currentUser.followers;
        }
        console.log(follow)
        this.profilesService.getProfileInfo(follow).subscribe(result => {
            console.log(result);
            this.profiles = result;
            this.status = profileStatus;
            this.router.navigateByUrl(`/profile/${this.user.username}`);
        })
    }
    setVisible(information) {
        this.advServise
            .changeVisible(information._id, information.visible)
            .subscribe(() => {
                this.advServise
                    .getByOwner(this.currentUser.username, information.visible)
                    .subscribe(result => {
                        this.adverts = result;
                        console.log(this.adverts);
                    });
            });
    }
    editAdvertisement(information) {
        this.advertisementInfo = information;
        if (this.advertisementInfo.type == 1) {
            this.adform = this.fb.group({
                crypto: [this.advertisementInfo.crypto, Validators.required],
                country: [this.advertisementInfo.country, Validators.required],
                fiat: [this.advertisementInfo.fiat, Validators.required],
                price: [this.advertisementInfo.price, [Validators.min(0)]],
                min_price: [null, [Validators.min(0), Validators.required]],
                max_price: [null, [Validators.min(0), Validators.required]],
                payment: ['', Validators.required],
                limit: [
                    null,
                    [Validators.min(15), Validators.max(60), Validators.required]
                ],
                message: ['', Validators.required]
            });
        } else {
            this.adform = this.fb.group({
                crypto: [this.advertisementInfo.crypto, Validators.required],
                country: [this.advertisementInfo.country, Validators.required],
                fiat: [this.advertisementInfo.fiat, Validators.required],
                price: [this.advertisementInfo.price, [Validators.min(0)]],
                min_price: [null, [Validators.min(0), Validators.required]],
                max_price: [null, [Validators.min(0), Validators.required]],
                payment: [null, Validators.required],
                limit: [null, [Validators.min(15), Validators.max(60)]],
                message: ['', Validators.required]
            });
        }
        //this.advDetailService.detailAdv(information);
        this.status = "advertsEdit";
        this.router.navigateByUrl(`/profile/${this.user.username}`);
    }
    // onToggleFollowing(following: boolean) {
    //   this.profile.following = following;
    // }

    // loadpayment(item) {
    //     var map = new Set(['alipay', 'paypal', 'bank', 'wechatPay']);
    //     console.log(map.size);
    //     for (let i = 0; i < item.length; i++) {
    //         switch (item[i]) {
    //             case 'alipay':
    //                 this.payment.alipay = true;
    //                 map.delete('alipay'); break;
    //             case 'paypal':
    //                 this.payment.paypal = true;
    //                 map.delete('paypal'); break;
    //             case 'bank':
    //                 this.payment.bank = true;
    //                 map.delete('bank'); break;
    //             case 'wechatPay':
    //                 this.payment.wechatPay = true;
    //                 map.delete('wechatPay'); break;
    //         }
    //         if (i + 1 == item.length) this.showpayment = true;
    //     }
    //     if (map.has('alipay')) { this.payment.alipay = false; console.log('1') }
    //     if (map.has('paypal')) { this.payment.paypal = false; console.log('2') }
    //     if (map.has('bank')) { this.payment.bank = false; console.log('3') }
    //     if (map.has('wechatPay')) { this.payment.wechatPay = false; console.log('4') }
    //     console.log(map.size);
    // }
    priceChange() {
        if (this.advertisementInfo.fiat && this.advertisementInfo.crypto) {
            switch (this.advertisementInfo.fiat) {
                case 'SGD':
                    this.currentPrice(this.advertisementInfo.crypto, 'SGD').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_sgd);
                    });
                    break;
                case 'CNY':
                    this.currentPrice(this.advertisementInfo.crypto, 'CNY').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_cny);
                    });
                    break;
                case 'USD':
                    this.currentPrice(this.advertisementInfo.crypto, 'USD').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_usd);
                    });
                    break;
                case 'KRW':
                    this.currentPrice(this.advertisementInfo.crypto, 'KRW').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_krw);
                    });
                    break;
                case 'MYR':
                    this.currentPrice(this.advertisementInfo.crypto, 'MYR').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_myr);
                    });
                    break;
                case 'THB':
                    this.currentPrice(this.advertisementInfo.crypto, 'THB').subscribe(result => {
                        this.cryptoprice = Number(result[0].price_thb);
                    });
                    break;
            }
        }
    }
    checkpayment() {
        this.advertisementInfo.payment = [];
        if (this.payment.alipay == true) this.advertisementInfo.payment.push('alipay')
        if (this.payment.bank == true) this.advertisementInfo.payment.push('bank')
        if (this.payment.paypal == true) this.advertisementInfo.payment.push('paypal')
        if (this.payment.wechatPay == true) this.advertisementInfo.payment.push('wechatPay')
    }
    currentPrice(crypto, fiat) {
        let url = `https://api.coinmarketcap.com/v1/ticker/${this.advertisementInfo.crypto}/?convert=${this.advertisementInfo.fiat}`
        return this.http.get(url);
    }
    editadv() {
        this.checkpayment();
        console.log(this.advertisementInfo);
        this.advServise.editAdv(this.advertisementInfo).subscribe(result => {
            console.log(result);
        })
    }
}
