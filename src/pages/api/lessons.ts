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

  console.log("recordId: " + recordId)

  let data = (await lessonsTable.find("recNvBuq3DUQkizYM")).fields

  const formattedData = data

  console.log(formattedData)

  return res.status(200).send({data: formattedData}) // populate this with your data
}
