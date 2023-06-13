import { UserType } from '@/types';
import { PropsWithChildren, memo } from 'react';
import { AddUserTodo } from './AddUserTodo';
import { Todo } from './Todo';
import { TodoHeader } from './TodoHeader';
interface TodoUserProps {
  user: UserType;
}
const TodoUser: React.FC<PropsWithChildren<TodoUserProps>> = memo(
  ({ user }) => {
    return (
      <div className='flex   mr-10 items-center justify-center mb-10 text-gray-600 bg-gray-100'>
        <div className='max-w-full p-8 bg-white rounded-lg shadow-lg w-96'>
          <TodoHeader name={`${user.firstName} ${user.lastName}`} />
          {user.todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}

          <AddUserTodo userId={user.id} />
        </div>
      </div>
    );
  }
);

export default TodoUser;
