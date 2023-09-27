import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export default function Home({
  records,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-screen p-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-center text-7xl text-shadow text-white font-bold">
          Strive Test Assessment
        </h1>
        <div className="mt-4">
          <h3 className="uppercase text-blue-100 text-center text-5xl text-white font-semiold">
            All records
          </h3>
        </div>
        <div className="mt-12 shadow-sm overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className=" text-white font-medium border-b">
              <tr className="text-3xl">
                <th className="py-5 px-6 border border-rose-500 bg-rose-900">
                  Record Id
                </th>
                <th className="py-5 px-6 border border-rose-500 bg-rose-900">
                  Name
                </th>
                <th className="py-5 px-6 border border-rose-500 text-center bg-rose-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-white table-custom">
              {records?.map((record: any) => (
                <tr key={record.id}>
                  <td className="py-5 px-6 border border-slate-700 whitespace-nowrap">
                    {record.id}
                  </td>
                  <td className="py-5 px-6 border border-slate-700 whitespace-nowrap">
                    {record.fields.Name}
                  </td>
                  <td className="py-5 px-6 border border-slate-700 whitespace-nowrap text-right">
                    <Link
                      href={`/${record.id}`}
                      className="uppercase font-light text-white border border-rose-900 bg-rose-900 hover:bg-rose-800  rounded-lg text-sm px-4 py-2 mr-2 mb-2"
                    >
                      View Record
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = (async context => {
  const { data } = await axios.get('http://localhost:3000/api/lessons')

  return { props: { records: data.data.records } }
}) satisfies GetServerSideProps<any>
