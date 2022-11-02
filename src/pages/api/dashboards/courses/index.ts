import { NextApiRequest, NextApiResponse } from 'next'
import { coursesDashboards } from '../../../../backend/server/controllers/dashboards/coursesDashboards.controller'
import { errorHandler } from '../../../../backend/server/controllers/errors/errorResponseHandler'

export default async function coursesDashboard (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const courses = await coursesDashboards()
        return res.status(200).send({ date: courses })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
