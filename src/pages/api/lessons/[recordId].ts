import Airtable from 'airtable';
import { NextApiRequest, NextApiResponse } from 'next';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { recordId } = req.query as { recordId: string };

	try {
		// Query all records in the "Lessons" table
		const record = await airtable
			.base(process.env.AIRTABLE_BASE_ID ?? '')
			.table('Lessons')
			.find(recordId);

		return res.status(200).json({ record });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}
