// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEvent } from '@/types/event.ts';

const { events } = require('./data.json')

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IEvent>
) {
	if (req.method === 'GET') {
		res.status(200).json(events)
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).json({ message: `Method ${req.method} is not allowed` })
	}
}
