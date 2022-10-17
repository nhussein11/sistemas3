import { NextApiRequest, NextApiResponse } from 'next'
import {
  createEnrollment,
  getEnrollments
} from '../../../backend/server/controllers/enrollments/enrollements.controller'
import { errorHandler } from '../../utils/errorResponseHandler'

export default async function enrollments (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const enrollments = await getEnrollments()
        return res.status(200).send({ enrollments })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { academicYear, courseId, studentIds } = body
        const enrollmentCreated = await createEnrollment(
          academicYear,
          courseId,
          studentIds
        )
        return res.status(201).send({ enrollmentCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
