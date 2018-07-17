import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/';

import { User } from '../models/User';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id'])
            .catch(error => {
                this.alertifyService.error('Problem with retrieving data');
                this.router.navigate(['/members']);
                return Observable.of(null);
            });
    }
}
