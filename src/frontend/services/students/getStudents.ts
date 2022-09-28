import publicAxiosInstance from '../../api/axios-api'

export const getStudents = async () => {
  const response = await publicAxiosInstance.get('/students')
  return response
}
