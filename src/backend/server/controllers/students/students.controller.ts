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

const createStudent = async (name: string, address: string) => {
  try {
    const studentCreated: Student = await prisma.student.create({
      data: { name, address }
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

const updateStudentById = async (id: string, name: string, address: string) => {
  try {
    await prisma.student.findUniqueOrThrow({ where: { id } })

    if (!name && !address) {
      throw new Error('Name or address must be provided!')
    }

    const updatedStudent: Student = await prisma.student.update({
      where: { id },
      data: {
        name,
        address
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
