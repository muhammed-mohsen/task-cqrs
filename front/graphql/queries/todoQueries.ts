import { gql } from '@apollo/client';
const GET_Todos_QUERY = gql`
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
