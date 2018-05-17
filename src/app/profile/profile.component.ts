import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile, AdvertisementsService, Advertisement, OrderInformation, OrderService } from '../core';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private advServise: AdvertisementsService,
    private orderService: OrderService
  ) { }

  profile: Profile;
  currentUser: User;
  isUser: boolean;
  advers : Advertisement[]
  orderLists : OrderInformation[]

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
    console.dir(this.profile)
    // console.dir(this.profile.verifystatus)

    console.log(this.currentUser.username)
    this.advServise.getByOwner(this.currentUser.username,true).subscribe(
      result => {
        this.advers = result
        console.log(result)
      }
    )
    console.log(this.advers)

    this.orderService.getByOwner(this.currentUser.username).subscribe(result => {
      this.orderLists = result
      console.log(result);
      
    })
  }

  // onToggleFollowing(following: boolean) {
  //   this.profile.following = following;
  // }

}
