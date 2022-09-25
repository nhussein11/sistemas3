import { NextApiRequest, NextApiResponse } from 'next'
import {
  createEnrollment,
  getEnrollments
} from '../../../backend/server/controllers/enrollments/enrollements.controller'

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
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { academicYear, courseId, studentId } = body
        const enrollmentCreated = await createEnrollment(
          academicYear,
          courseId,
          studentId
        )
        return res.status(201).send({ enrollmentCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
