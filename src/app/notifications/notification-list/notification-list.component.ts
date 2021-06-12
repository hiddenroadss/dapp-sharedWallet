import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Command, NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  messages$: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages$ = this.notificationsService.messagesOutput;
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.notificationsService.addSuccess(
          'You need to confirm it in MetaMask'
        ),
      1000
    );
  }
}
