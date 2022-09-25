/* eslint-disable no-useless-catch */
import { Enrollment } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getEnrollments = async () => {
  try {
    const enrollments: Enrollment[] = await prisma.enrollment.findMany()
    return enrollments
  } catch (error) {
    throw error
  }
}

const createEnrollment = async (
  academicYear: number,
  courseId: string,
  studentId: string
) => {
  try {
    const enrollmentCreated: Enrollment = await prisma.enrollment.create({
      data: { academicYear, courseId, studentId }
    })

    return enrollmentCreated
  } catch (error) {
    throw error
  }
}

const getEnrollmentById = async (id: string) => {
  try {
    const enrollment: Enrollment = await prisma.enrollment.findUniqueOrThrow({
      where: {
        id
      }
    })
    return enrollment
  } catch (error) {
    throw error
  }
}

const updateEnrollmentById = async (id: string, academicYear: number) => {
  try {
    await prisma.enrollment.findUniqueOrThrow({ where: { id } })

    if (!academicYear) {
      throw new Error('Academic year must be provided!')
    }

    const updatedEnrollment: Enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        academicYear
      }
    })

    return updatedEnrollment
  } catch (error) {
    throw error
  }
}

const deleteEnrollmentById = async (id: string) => {
  try {
    const deletedEnrollment: Enrollment = await prisma.enrollment.delete({
      where: { id }
    })

    return deletedEnrollment
  } catch (error) {
    throw error
  }
}

export {
  getEnrollments,
  createEnrollment,
  getEnrollmentById,
  updateEnrollmentById,
  deleteEnrollmentById
}
