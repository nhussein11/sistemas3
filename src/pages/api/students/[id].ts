/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteStudentById,
  getStudentById,
  updateStudentById
} from '../../../backend/server/controllers/students/students.controller'
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
        const student = await getStudentById(id)
        return res.status(200).send({ student })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { name, surname, identificationNumber, birth, phone, email } = body

      try {
        const updatedStudent = await updateStudentById(
          id,
          name,
          surname,
          identificationNumber,
          birth,
          phone,
          email
        )
        return res.status(200).send({ updatedStudent })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedStudent = await deleteStudentById(id)
        return res.status(200).send({ deletedStudent })
      } catch (error: any) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
