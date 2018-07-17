import { AlertifyService } from './../../services/alertify.service';
import { MessageService } from './../../services/message.service';
import { AuthService } from './../../services/auth.service';
import { Message } from './../../models/message';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/do';
import * as underscore from 'underscore';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('userId')userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private alertifyService: AlertifyService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.messageService.getMessageThread(this.authService.decodedToken.nameid, this.userId)
      .do(messages => {
        underscore.each(messages, (message: Message) => {
          if (message.isRead === false && message.recipientId === currentUserId) {
            this.messageService.markAsRead(currentUserId, message.id);
          }
        });
      })
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.messageService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(message => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertifyService.error(error);
      });
  }
}
