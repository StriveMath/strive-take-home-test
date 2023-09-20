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

  // routing to this page without a correct recordId will throw error, so instead 404 page is thrown
  const res2 = await fetch(
    `http://localhost:3000/api/lessons?recordId=${recordId}`
  )
  const result = await res2.json()

  if (!result || !result.data) {
    return {
      notFound: true,
    }
  }
  const record = result.data

  // i need list of records for the navigation header labels

  const res = await fetch(`http://localhost:3000/api/lessons`)
  const resultLesson = await res.json()
  const records = resultLesson.data

  return {
    props: {records, record},
  }
}
