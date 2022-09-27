import publicAxiosInstance from '../../api/axios-api'
type CourseData = {
  name: string
  description: string
  price: number
  hoursQuantity: number
}
export const createNewCourse = async (course: CourseData) => {
  const response = await publicAxiosInstance.post('/courses', course)
  return response
}
