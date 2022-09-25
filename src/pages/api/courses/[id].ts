/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCourseById, getCourseById, updateCourseById } from '../../../backend/server/controllers/courses/courses.controller'

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
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { name, price, description, productId } = body

      try {
        const updatedCourse = await updateCourseById(
          id,
          name,
          price,
          description,
          productId
        )
        return res.status(200).send({ updatedCourse })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedCourse = await deleteCourseById(id)
        return res.status(200).send({ deletedCourse })
      } catch (error: any) {
        switch (error.code) {
          case 'P2003':
            return res.status(401).send({
              error,
              messageError:
                "You cannot delete this product because it's belong to an existing stock"
            })
          case 'P2025':
            return res.status(402).send({
              error,
              messageError: 'Id not provided'
            })
          default:
            return res.status(450).send({
              error,
              messageError: 'Something failed'
            })
        }
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
