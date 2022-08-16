import type { NextApiRequest, NextApiResponse } from 'next'

type PingResponse = {
  response: string
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<PingResponse>
) {
  res.status(200).json({ response: 'Ping!' })
}
