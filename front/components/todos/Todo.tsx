import { CheckSvg } from '@/components/svgs/CheckSvg';
import { TODO_UPDATE_MUTATION } from '@/graphql/mutations/todo';
import { GET_USERS_QUERY } from '@/graphql/queries/userQueries';
import { TodoStatusEnum, TodoType } from '@/types';
import { useMutation } from '@apollo/client';
import React, { PropsWithChildren } from 'react';

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<PropsWithChildren<TodoProps>> = ({ todo }) => {
  const [updateTodoMutation] = useMutation(TODO_UPDATE_MUTATION, {
    refetchQueries: [GET_USERS_QUERY],
  });
  const handleUpdateTodo = async (id, todoUpdateInput) => {
    try {
      const { data } = await updateTodoMutation({
        variables: { id, todoUpdateInput },
      });
      console.log('Updated todo:', data.updateTodo);
      // Handle successful update
    } catch (error) {
      console.error('Error updating todo:', error.message);
      // Handle error
    }
  };
  const isChecked = todo.status === TodoStatusEnum.DONE;

  return (
    <div className='my-4 '>
      <input
        className='hidden'
        type='checkbox'
        id={todo.id}
        checked={isChecked}
        onChange={() => {
          handleUpdateTodo(todo.id, {
            status:
              todo.status === TodoStatusEnum.DONE
                ? TodoStatusEnum.IN_PROGRESS
                : TodoStatusEnum.DONE,
          });
        }}
      />

      <label
        className='flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100'
        htmlFor={todo.id}
      >
        <span className='flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full'>
          <CheckSvg />
        </span>
        <span className='ml-4 text-sm'>{todo.text}</span>
      </label>
    </div>
  );
};
