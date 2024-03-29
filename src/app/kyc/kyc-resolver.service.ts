import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Kyc, ProfilesService } from '../core';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class KycResolver implements Resolve<Kyc> {
    constructor(
        private profilesService: ProfilesService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        return this.profilesService.get(route.params['username'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));

    }
}
