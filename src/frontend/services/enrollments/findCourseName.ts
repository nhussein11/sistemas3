import { UseQueryResult } from '@tanstack/react-query'
import { CourseFrontend } from '../../@types/frontend.types'

export const findCourseName = (
  id: string,
  CourseQuery: UseQueryResult<{ courses: CourseFrontend[] }, unknown>
) => {
  const course = CourseQuery.data?.courses?.find(
    (course: CourseFrontend) => course.id === id
  )
  return course?.name
}
