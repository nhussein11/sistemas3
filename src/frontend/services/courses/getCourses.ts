import publicAxiosInstance from '../../api/axios-api'

export const getCourses = async () => {
  const response = await publicAxiosInstance.get('/courses')
  return response
}
