import { AlertifyService } from './../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Pagination, PaginatedResult } from './../models/pagination';
import { Message } from './../models/message';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import * as underscore from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.messageService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deleteMessage(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this message?', () => {
      this.messageService.deleteMessage(id, this.authService.decodedToken.nameid)
      .subscribe(() => {
        this.messages.splice(underscore.findIndex(this.messages, {id: id}), 1);
        this.alertifyService.success('Message has been deleted');
      }, () => {
          this.alertifyService.error('Failed to delete a message');
        });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  changeContainer() {
    this.pagination.currentPage = 1;
    this.loadMessages();
  }
}
