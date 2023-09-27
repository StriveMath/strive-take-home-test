import BaseLayout from '@/components/BaseLayout'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import axios from 'axios'
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from 'next'
import Link from 'next/link'

export default function Lesson(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const record = props.record

  return (
    <BaseLayout>
      <main className="pt-5">
        <Link
          href="/"
          className="uppercase font-light text-white border border-rose-900 bg-rose-900 hover:bg-rose-800  rounded-lg text-sm px-4 py-2 mr-2 mb-2"
        >
          Go Back
        </Link>

        <section className="py-14">
          <div className="max-w-screen-xl mx-auto  md:px-8">
            <div className="max-w-2xl mx-auto ">
              <h1 className="text-center text-7xl text-shadow text-white font-bold">
                {record.fields.Name}
              </h1>
              <div className="mt-3">
                <MarkdownRenderer markdownContent={record.fields.Content} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { recordId } = ctx.params as { recordId: string }

  const { data } = await axios.get(
    `http://localhost:3000/api/lessons/${recordId}`
  )

  return {
    props: { record: data.data.record },
  }
}
