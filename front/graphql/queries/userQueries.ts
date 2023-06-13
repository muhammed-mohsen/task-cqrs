import { gql } from '@apollo/client';
export const GET_USERS_QUERY = gql`
  query {
    users {
      id
      firstName
      lastName
      todos {
        text
        id
        status
      }
    }
  }
`;
