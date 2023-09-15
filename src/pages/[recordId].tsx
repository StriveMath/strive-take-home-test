import BaseApp from "@/components/BaseApp"
import BaseLayout from "@/components/BaseLayout"
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next"

export default function Lesson(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <BaseLayout>
      <BaseApp />
    </BaseLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // server side code here
  const {recordId} = ctx.params as {recordId: string}

  return {
    props: {recordId},
  }
}
