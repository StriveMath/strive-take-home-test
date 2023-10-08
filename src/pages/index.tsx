import { Inter } from "next/font/google";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getData } from "./api/lessons";

const inter = Inter({ subsets: ["latin"] });

//Reroute the user to first lesson first slide on load
// In prod user can go to lessons via links from here
export default function Home({
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error) {
    return <>There was an error fetching data</>;
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between  ${inter.className}`}
    ></main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const recordsList = await getData();
  if (recordsList) {
    return {
      redirect: {
        permanent: false,
        destination: `/${recordsList[0].id}`,
      },
      props: {},
    };
  } else
    return {
      props: {
        error: "Error fetching data",
      },
    };
};
