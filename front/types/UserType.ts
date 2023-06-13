import { TodoType } from './TodoType';

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  todos: TodoType[];
};
