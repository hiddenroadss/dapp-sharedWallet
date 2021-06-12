import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

interface Command {
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
    this.messagesInput.next({
      id: this.randomId(),
      text: message,
      type: 'success',
    });
  }

  addError(message: string): void {
    this.messagesInput.next({
      id: this.randomId(),
      text: message,
      type: 'error',
    });
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
