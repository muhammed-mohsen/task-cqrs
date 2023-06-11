import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoCreatedEvent } from 'src/todo/domain/event/TodoCreatedEvent';
// import { OrderEvent, OrderEventSuccess } from './order.events';
// import { OrderCommand } from './order.command';
@Injectable()
export class UserSaga {
  @Saga()
  handleTodoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TodoCreatedEvent),
      map((event) => {
        console.log(
          '🚀 ~ file: UserSaga.ts:14 ~ OrderSaga ~ map ~ event:',
          event,
        );
        return [];
      }),
    );
  };
}
