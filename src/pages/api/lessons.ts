import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const baseId = process.env.AIRTABLE_BASE_ID as string;
const base = airtable.base(baseId);

// meant to fetch our lessons
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // your code here
  try {
    const records = await getData();
    return res.status(200).json({ output: records });
    // see api reference: https://airtable.com/appofHk5rJkpaimm1/api/docs#javascript
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getData = async () => {
  let records: { id: string; name: string }[] = [];
  await new Promise<void>((resolve, reject) => {
    base("Lessons")
      .select({
        maxRecords: 10,
        view: "Grid view",
      })
      .firstPage((err, recs) => {
        if (err) {
          reject(err);
          throw err;
        }
        if (recs)
          records = recs.map((r) => {
            return {
              id: r.id,
              name: r.fields.Name as string,
            };
          });
        resolve();
      });
  });
  return records;
};
