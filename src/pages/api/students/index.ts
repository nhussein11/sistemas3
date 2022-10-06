import { NextApiRequest, NextApiResponse } from 'next'
import {
  createStudent,
  getStudents
} from '../../../backend/server/controllers/students/students.controller'
import { errorHandler } from '../../utils/errorResponseHandler'

export default async function students(
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
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { name, surname, identificationNumber, birth, phone, email } = body
        const studentCreated = await createStudent(
          name,
          surname,
          identificationNumber,
          birth,
          phone,
          email
        )
        return res.status(201).send({ studentCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
