import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID ?? "appofHk5rJkpaimm1");
const lessonsTable = base("Lessons");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recordId } = req.query as { recordId: string };
  try{
    if(recordId){
    let records = await lessonsTable.find(recordId)
    return res.status(200).send({ data: records.fields });
    }
  }
  catch(error){
    res.status(500).send({"status": "fail", "message": "Something went wrong"})
  }
}
