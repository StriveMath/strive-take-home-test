"use client"
import BaseApp from "@/components/BaseApp"
import {InferGetServerSidePropsType} from "next"

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <BaseApp records={props.records} />
}

export const getServerSideProps = async () => {
  // server side code here

  const res = await fetch(`http://localhost:3000/api/lessons`)
  const records = await res.json()
  return {
    props: {records},
  }
}
