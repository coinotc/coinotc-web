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
    advertisement
} from '../core';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';

@Component({
    selector: './profile.component.scss',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    profile: Profile;
    currentUser: User;
    isUser: boolean;
    adverts: Advertisement[];
    orderLists: OrderInformation[];
    status = 'basciInformation';
    user: User;
    profileUser: User;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private advServise: AdvertisementsService,
        private orderService: OrderService
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
        console.dir(this.profile);
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
    // onToggleFollowing(following: boolean) {
    //   this.profile.following = following;
    // }
}
