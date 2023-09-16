import Airtable from "airtable"
import {NextApiRequest, NextApiResponse} from "next"

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
const base = airtable.base(process.env.AIRTABLE_BASE_ID ?? "appofHk5rJkpaimm1")
const lessonsTable = base("Lessons")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {recordId} = req.query as {recordId: string}

  try {
    let record
    if (recordId) {
      record = (await lessonsTable.find(`${recordId}`)).fields
    }

    // for the purpose of this assessment, first page is enough
    const records = (await lessonsTable.select({}).firstPage()).map((item) => ({
      id: item.id,
      ...item.fields,
    }))

    const formattedData = {
      record,
      records,
    }

    console.log(formattedData)

    return res.status(200).send({data: formattedData})
  } catch (error) {
    res.status(400).send({msg: "Bad request"})
  }
}
