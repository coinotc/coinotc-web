/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { User,Advertisement, UserService, AdvertisementsService } from '../core';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private advertisementsService: AdvertisementsService
  ) {}

  adverts: Advertisement[];

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.advertisementsService.getAll()
      .subscribe(adverts =>
        this.adverts = adverts)

  }
}
