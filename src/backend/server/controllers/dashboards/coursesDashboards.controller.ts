import { prisma } from '../../prisma-client/prisma-client'

const coursesDashboards = async () => {
  const courses = await prisma.course.findMany({})
  const coursesPromises = courses.map(async (course) => {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: course.id
      }
    })

    const studentsIds = enrollments.map((enrollment) => enrollment.studentId)
    const studentsPromises = studentsIds.map(async (student) => {
      const studentData = await prisma.student.findUnique({
        where: {
          id: student
        }
      })
      return studentData
    })
    const studentsData = await Promise.allSettled(studentsPromises)
    const studentsFiltered = studentsData.map((student:any) => student.value)
    return {
      course,
      students: studentsFiltered
    }
  })
  const coursesData = await Promise.allSettled(coursesPromises)
  const coursesFiltered = coursesData.map((course:any) => course.value)
  return coursesFiltered
}

export { coursesDashboards }
