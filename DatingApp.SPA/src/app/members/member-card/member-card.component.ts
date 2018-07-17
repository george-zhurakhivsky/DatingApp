import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { User } from '../../models/User';
import { Component, OnInit, Input } from '@angular/core';
import { error } from 'util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('user')user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  sendlike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(data => {
        this.alertifyService.success('You have liked: ' + this.user.knownAs);
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        this.alertifyService.error(error);
      });
  }
}
