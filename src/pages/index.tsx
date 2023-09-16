import BaseApp from "@/components/BaseApp"
import StarterBase from "@/components/StarterBasr"
import {lessonsProps} from "@/types"
import {InferGetServerSidePropsType} from "next"
import {useRouter} from "next/router"

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const data = props.records as lessonsProps[]

  const firstId = data.map((record) => record.id)[0]

  return <StarterBase id={firstId} />
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
