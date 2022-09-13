import publicAxiosInstance from '../../api/axios-api'

export const getDetails = async () => {
  const response = await publicAxiosInstance.get('/records-details')
  return response
}
