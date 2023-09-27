import Airtable from 'airtable'
import { NextApiRequest, NextApiResponse } from 'next'

const baseId = process.env.AIRTABLE_BASE_ID as string
const tableName = 'Lessons'

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base = airtable.base(baseId)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recordId } = req.query as { recordId: string }

  try {
    const allRecords: any[] = []

    await new Promise<void>((resolve, reject) => {
      base(tableName)
        .select({
          maxRecords: 20,
          view: 'Grid view',
        })
        .eachPage(
          function page(records, fetchNextPage) {
            allRecords.push(...records)
            fetchNextPage()
          },
          function done(err) {
            if (err) {
              console.error(err)
              reject(err)
              return
            }
            resolve()
          }
        )
    })

    return res.status(200).send({ data: { records: allRecords } })
  } catch (error) {
    console.error('Error fetching records from Airtable:', error)
    return res.status(500).send({ error: 'Internal Server Error' })
  }
}
