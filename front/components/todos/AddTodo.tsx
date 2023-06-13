import { TODO_CREATE_MUTATION } from '@/graphql/mutations/todo';
import { GET_USERS_QUERY } from '@/graphql/queries/userQueries';
import useStore from '@/store/todo';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
interface AddTodoProps {}
const schema = z.object({
  userId: z
    .string({
      required_error: 'user is required',
    })
    .nonempty({ message: 'you should select user' }),
  text: z
    .string({
      required_error: 'text is required',
    })
    .nonempty({ message: "Text shouldn't be empty" }),
});
type FormType = {
  text: string;
  userId: string;
};

export const AddTodo: React.FC<PropsWithChildren<AddTodoProps>> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
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

  const onSubmit = (values: FormType) => {
    handleCreateTodo(values);
  };
  const users = useStore((state) => state.users);
  return (
    <div className='justify-center flex mb-10'>
      <form className='flex-col flex' onSubmit={handleSubmit(onSubmit)}>
        <div className='border border-gray-300 rounded h-14 flex'>
          <input
            type='text'
            {...register('text')}
            className='px-2 py-1 rounded-l  focus:border-none  w-80'
            placeholder='Enter text'
          />
          <select
            name='userId'
            {...register('userId')}
            className='px-2 py-1 border-l'
          >
            <option value=''>select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName + ' ' + user.lastName}
              </option>
            ))}
          </select>
          <button className='px-8 py-1 bg-blue-500 text-white rounded-r'>
            Add Todo
          </button>
        </div>
        <p className='text-sm text-red-400'>
          {(errors.text || errors.userId) &&
            (errors.text?.message || errors.userId?.message)}
        </p>
      </form>
    </div>
  );
};
