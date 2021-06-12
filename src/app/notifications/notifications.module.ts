import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [CommonModule, NotificationsRoutingModule, MatIconModule],
  exports: [NotificationListComponent],
})
export class NotificationsModule {}
