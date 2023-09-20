import BaseApp from "@/components/BaseApp"
import BaseLayout from "@/components/BaseLayout"
import StarterBase from "@/components/StarterBasr"
import {lessonsProps} from "@/types"
import {InferGetServerSidePropsType} from "next"
import {useRouter} from "next/router"

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const data = props.records as lessonsProps[]
  const firstId = data.map((record) => record.id)[0]

  return (
    <BaseLayout>
      <StarterBase id={firstId} />
    </BaseLayout>
  )
}

export const getServerSideProps = async () => {
  // server side code here

  // i need to have a known id from the lesson table, to avoid breaking /recordId details page
  const res = await fetch(`http://localhost:3000/api/lessons`)
  const result = await res.json()
  const records = result.data

  return {
    props: {records},
  }
}
