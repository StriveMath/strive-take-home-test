"use client"
import BaseApp from "@/components/BaseApp"
import {InferGetServerSidePropsType} from "next"

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // i return base app here as default page
  return <BaseApp records={props.records} />
}

export const getServerSideProps = async () => {
  // server side code here

  // that's why  i fetch data in the main for the navigation header names and label
  const res = await fetch(`http://localhost:3000/api/lessons`)
  const result = await res.json()
  const records = result.data.records
  return {
    props: {records},
  }
}
