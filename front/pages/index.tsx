import type { GetServerSideProps } from "next";

export default function Todos() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { redirect: { destination: "/todos" } };
};
