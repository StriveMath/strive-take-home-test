import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const baseId = process.env.AIRTABLE_BASE_ID as string;
const base = airtable.base(baseId);

// meant to fetch lesson content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recordId } = req.query as { recordId: string };

  // your code here
  try {
    const record = await base("Lessons").find(recordId);
    return res.status(200).json({ ...record });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
