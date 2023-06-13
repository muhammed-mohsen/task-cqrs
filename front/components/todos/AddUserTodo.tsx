import { TODO_CREATE_MUTATION } from '@/graphql/mutations/todo';
import { GET_USERS_QUERY } from '@/graphql/queries/userQueries';
import { useMutation } from '@apollo/client';
import React, { PropsWithChildren, useState } from 'react';
import { PlusSvg } from '../svgs/PlusSvg';

interface AddTodoProps {
  userId: string;
}

export const AddUserTodo: React.FC<PropsWithChildren<AddTodoProps>> = ({
  userId,
}) => {
  const [todoText, setTodoText] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [createTodoMutation] = useMutation(TODO_CREATE_MUTATION, {
    refetchQueries: [GET_USERS_QUERY],
  });
  const handleCreateTodo = async (todoCreateInput) => {
    try {
      const { data } = await createTodoMutation({
        variables: { todoCreateInput },
      });
      console.log('Created todo:', data.createTodo);
      // Handle successful create
    } catch (error) {
      console.error('Error creating todo:', error.message);
      // Handle error
    }
  };
  const handleAdd = () => {
    if (!todoText) {
      setShowError(true);
      return;
    } else setShowError(false);
    handleCreateTodo({ text: todoText, userId });
  };
  return (
    <div>
      <button className='flex items-center mb-1 w-full h-8 px-2 mt-2 text-sm font-medium rounded'>
        <PlusSvg onClick={handleAdd} />
        <input
          className='flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium'
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type='text'
          placeholder='add a new task'
        />
      </button>
      {!todoText && showError && (
        <p className='text-red-400 text-sm'>please enter text</p>
      )}
    </div>
  );
};
