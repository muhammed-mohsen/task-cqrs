import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoUpdatedEvent } from 'src/todo/domain/event/TodoUpdatedEvent';
// import { OrderEvent, OrderEventSuccess } from './order.events';
// import { OrderCommand } from './order.command';
@Injectable()
export class UserSaga {
  @Saga()
  handleTodoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TodoUpdatedEvent),
      map((event: TodoUpdatedEvent) => {
        console.log(
          '🚀 ~ file: UserSaga.ts:14 ~ OrderSaga ~ map ~ event:',
          event,
        );
        return null;
      }),
    );
  };
}
