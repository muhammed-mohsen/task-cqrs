import { Todo } from './Todo';

export default interface TodoRepository {
  create: (data: Todo) => void;
  newId: () => Promise<string>;
}
