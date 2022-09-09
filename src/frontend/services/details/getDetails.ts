import publicAxiosInstance from '../../api/axios-api'

export const getDetails = async () => {
  const response = await publicAxiosInstance.get('/movement-details')
  return response
}
