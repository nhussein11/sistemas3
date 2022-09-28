import publicAxiosInstance from '../../api/axios-api'

export const getEnrollments = async () => {
  const response = await publicAxiosInstance.get('/enrollments')
  return response
}
