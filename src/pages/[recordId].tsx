import BaseApp from "@/components/BaseApp"
import BaseLayout from "@/components/BaseLayout"
import {lessonsProps} from "@/types"
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next"

export default function Lesson(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <BaseLayout>
      <BaseApp record={props.record} records={props.records} />
    </BaseLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // server side code here
  const {recordId} = ctx.params as {recordId: string}

  const res2 = await fetch(
    `http://localhost:3000/api/lessons?recordId=${recordId}`
  )
  const result = await res2.json()
  const record = result.data.record

  const res = await fetch(`http://localhost:3000/api/lessons`)
  const resultLesson = await res.json()
  const records = resultLesson.data.records
  return {
    props: {records, record},
  }
}
