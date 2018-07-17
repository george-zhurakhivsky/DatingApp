import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/User';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { AuthService } from './../services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService,
    private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .catch(error => {
                this.alertifyService.error('Problem with retrieving data');
                this.router.navigate(['/members']);
                return Observable.of(null);
            });
    }
}
