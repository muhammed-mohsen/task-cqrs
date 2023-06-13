import { useQuery } from "@apollo/client";
import type { GetServerSideProps } from "next";

import { AddTodo } from "@/components/todos/AddTodo";
import TodoUser from "@/components/todos/TodoUser";
import { addApolloState, initializeApollo } from "@/graphql/apollo";
import { GET_USERS_QUERY } from "@/graphql/queries/userQueries";
import useStore from "@/store/todo";
import { UserType } from "@/types/UserType";

export default function Todos() {
  const { data, loading, error } = useQuery<{ users: UserType[] }>(
    GET_USERS_QUERY,
    {}
  );
  const setUsers = useStore((state) => state.setUsers);
  setUsers(data.users);
  const users = useStore((state) => state.users);

  if (error) {
    return <p>:( an error happened</p>;
  }

  return (
    <div className="h-full w-full bg-gray-100 py-20">
      <AddTodo />
      <div className="flex  flex-wrap  max-w-7xl mx-auto justify-start w-full h-full font-medium">
        {users.map((user) => (
          <TodoUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo();

  await client.query({
    query: GET_USERS_QUERY,
  });
  // const response = fetch("http://todo_api:8000/");

  // return { props: {} };
  return addApolloState(client, {
    props: {},
  });
};
