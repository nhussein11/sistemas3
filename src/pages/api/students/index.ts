import { NextApiRequest, NextApiResponse } from 'next'
import {
  createStudent,
  getStudents
} from '../../../backend/server/controllers/students/students.controller'

export default async function students (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const students = await getStudents()
        return res.status(200).send({ students })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { name, address } = body
        const studentCreated = await createStudent(name, address)
        return res.status(201).send({ studentCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
