import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ProfilesService {
    constructor(private apiService: ApiService) {}

    get(username: string): Observable<Profile> {
        return this.apiService
            .get('/profiles/' + username)
            .pipe(map((data: { profile: Profile }) => data.profile));
    }

    follow(username: string): Observable<Profile> {
        return this.apiService.post('/profiles/' + username + '/follow');
    }

    unfollow(username: string): Observable<Profile> {
        return this.apiService.delete('/profiles/' + username + '/follow');
    }
    public getProfile(username): Observable<Profile> {
        let URL = `/users/public?username=${username}`;
        return this.apiService.get(URL);
    }
    public getProfileInfo(profile): Observable<Profile[]> {
        console.log(profile)
        let URL = `/users/profile?profile=${profile}`;
        return this.apiService.get(URL);
    }
    sendRating(username, ratings) {
        let URL = `/users/public/ratings?username=${username}`;
        return this.apiService.patch(URL, ratings);
    }
}
