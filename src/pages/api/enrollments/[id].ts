/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteEnrollmentById,
  getEnrollmentById,
  updateEnrollmentById
} from '../../../backend/server/controllers/enrollments/enrollements.controller'
import { errorHandler } from '../../utils/errorResponseHandler'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id }
  } = req

  if (typeof id !== 'string') {
    return res.status(500).send({ error: 'id must be string type' })
  }

  switch (method) {
    case 'GET':
      try {
        const enrollment = await getEnrollmentById(id)
        return res.status(200).send({ enrollment })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { academicYear } = body

      try {
        const updatedEnrollment = await updateEnrollmentById(id, academicYear)
        return res.status(200).send({ updatedEnrollment })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedEnrollment = await deleteEnrollmentById(id)
        return res.status(200).send({ deletedEnrollment })
      } catch (error: any) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
