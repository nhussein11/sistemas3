import { NextApiRequest, NextApiResponse } from 'next'
import {
  createCourse,
  getCourses
} from '../../../backend/server/controllers/courses/courses.controller'

export default async function courses (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const courses = await getCourses()
        return res.status(200).send({ courses })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { name, hoursQuantity, price, description } = body
        const courseCreated = await createCourse(name, hoursQuantity, price, description)
        return res.status(201).send({ courseCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
