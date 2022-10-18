/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCourseById, getCourseById, updateCourseById } from '../../../backend/server/controllers/courses/courses.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

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
        const course = await getCourseById(id)
        return res.status(200).send({ course })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { name, hoursQuantity, price, description } = body

      try {
        const updatedCourse = await updateCourseById(
          id,
          name,
          hoursQuantity,
          price,
          description
        )
        return res.status(200).send({ updatedCourse })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedCourse = await deleteCourseById(id)
        return res.status(200).send({ deletedCourse })
      } catch (error: any) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
