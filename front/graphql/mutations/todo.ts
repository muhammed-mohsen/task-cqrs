import { gql } from '@apollo/client';

export const TODO_UPDATE_MUTATION = gql`
  mutation UpdateTodo($id: ID!, $todoUpdateInput: TodoUpdateInput!) {
    updateTodo(id: $id, TodoUpdateInput: $todoUpdateInput) {
      status
    }
  }
`;

export const TODO_CREATE_MUTATION = gql`
  mutation createTodo($todoCreateInput: TodoCreateInput!) {
    createTodo(TodoCreateInput: $todoCreateInput) {
      status
    }
  }
`;
