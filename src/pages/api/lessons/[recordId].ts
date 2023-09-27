import Airtable from 'airtable'
import type { NextApiRequest, NextApiResponse } from 'next'

const baseId = process.env.AIRTABLE_BASE_ID as string
const tableName = 'Lessons'

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base = airtable.base(baseId)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const recordId = req.query.recordId as string

  try {
    // Find the record by its ID
    base(tableName).find(recordId, function (err, record) {
      if (err) {
        console.error(err)
        return res.status(500).send({ error: 'Internal Server Error' })
      }

      if (record) {
        // Record found, send it as a response
        return res.status(200).send({ data: { record } })
      } else {
        // Record not found
        return res.status(404).send({ error: 'Record not found' })
      }
    })
  } catch (error) {
    console.error('Error fetching record from Airtable:', error)
    return res.status(500).send({ error: 'Internal Server Error' })
  }
}
