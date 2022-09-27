/* eslint-disable no-useless-catch */
import { Student } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getStudents = async () => {
  try {
    const students: Student[] = await prisma.student.findMany()
    return students
  } catch (error) {
    throw error
  }
}

const createStudent = async (name: string, surname: string, identificationNumber: number) => {
  try {
    const studentCreated: Student = await prisma.student.create({
      data: { name, surname, identificationNumber }
    })

    return studentCreated
  } catch (error) {
    throw error
  }
}

const getStudentById = async (id: string) => {
  try {
    const student: Student = await prisma.student.findUniqueOrThrow({
      where: {
        id
      }
    })
    return student
  } catch (error) {
    throw error
  }
}

const updateStudentById = async (id: string, name: string, surname: string, identificationNumber: number) => {
  try {
    await prisma.student.findUniqueOrThrow({ where: { id } })

    if (!name && !surname && !identificationNumber) {
      throw new Error('Name, surname or identification number must be provided!')
    }

    const updatedStudent: Student = await prisma.student.update({
      where: { id },
      data: {
        name,
        surname,
        identificationNumber
      }
    })

    return updatedStudent
  } catch (error) {
    throw error
  }
}

const deleteStudentById = async (id: string) => {
  try {
    const deletedStudent: Student = await prisma.student.delete({
      where: { id }
    })

    return deletedStudent
  } catch (error) {
    throw error
  }
}

export {
  getStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById
}
