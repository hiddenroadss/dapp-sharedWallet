import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  text?: string;
  type: 'success' | 'error' | 'clear';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value) => {
        if (value.type === 'clear') {
          return acc.filter((item) => item.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccess(message: string): void {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'success',
    });

    // setTimeout(() => this.clearMessage(id), 5000);
  }

  addError(message: string): void {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'error',
    });

    setTimeout(() => this.clearMessage(id), 5000);
  }

  clearMessage(id: number): void {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  randomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
