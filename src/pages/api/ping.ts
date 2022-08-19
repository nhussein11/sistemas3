import type { NextApiRequest, NextApiResponse } from 'next'
import { PingResponse } from '../../shared/schemas/ping.type'


export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<PingResponse>
) {
  res.status(200).json({ response: 'Ping!' })
}
