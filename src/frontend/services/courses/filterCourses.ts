import { CourseFrontend } from '../../@types/frontend.types'

export const filterCourses = (courses: CourseFrontend[], search: string) => {
  return courses?.filter((course) => {
    return course.name.toLowerCase().includes(search.toLowerCase())
  })
}
