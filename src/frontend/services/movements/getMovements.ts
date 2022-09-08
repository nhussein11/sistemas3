import publicAxiosInstance from '../../api/axios-api'

export const getMovements = async () => {
  const response = await publicAxiosInstance.get('/movements')
  return response
}
