import { Course } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'

const coursesDashboards = async () => {
  const courses = await prisma.course.findMany({})

  const enrollments = await prisma.enrollment.findMany({
    select: {
      courseId: true
    }
  })
  const coursesWithEnrollments = courses.map(async (course:Course) => {
    const enrollmentsByCourse = enrollments.filter(
      (enrollment) => enrollment.courseId === course.id
    )
    const product = await prisma.product.findUnique({
      where: {
        id: course.productId
      }
    })
    return {
      course: course.name,
      month: course.datetime.toLocaleString('default', { month: 'long' }),
      coursePrice: product?.price,
      totalPrice: (product?.price || 0) * enrollmentsByCourse.length,
      enrollments: enrollmentsByCourse.length
    }
  })
  const coursesWithEnrollmentsResolved = await Promise.all(
    coursesWithEnrollments
  )
  return coursesWithEnrollmentsResolved
}

export { coursesDashboards }
