import { AuthService } from './../services/auth.service';
import { Message } from './../models/message';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/';

import { AlertifyService } from '../services/alertify.service';
import { MessageService } from '../services/message.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';

    constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private alertifyService: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.messageService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer)
            .catch(error => {
                this.alertifyService.error('Problem with retrieving data');
                this.router.navigate(['/home']);
                return Observable.of(null);
            });
    }
}
