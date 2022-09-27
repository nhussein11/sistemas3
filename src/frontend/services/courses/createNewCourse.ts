import publicAxiosInstance from '../../api/axios-api'
type CourseData = {
  name: string
}
export const createNewCourse = async (course: CourseData) => {
  const response = await publicAxiosInstance.post('/courses', course)
  return response
}
