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

  let data = await lessonsTable.select({}).firstPage()

  const formattedData = data.map((item) => ({
    id: item.id,
    ...item.fields,
  }))

  // your code here
  // see api reference: https://airtable.com/appofHk5rJkpaimm1/api/docs#javascript/authentication

  return res.status(200).send({data: formattedData}) // populate this with your data
}
