import { Enrollment } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'

export const filterEnrollmentsByCourse = (
  enrollments: UseQueryResult<{ enrollments: Enrollment[] }, unknown>,
  courseId: string
) => {
  return enrollments.data?.enrollments.filter(
    (enrollment) => enrollment.courseId === courseId
  )
}
