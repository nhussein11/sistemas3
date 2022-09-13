import publicAxiosInstance from '../../api/axios-api'

export const getRecords = async () => {
  const response = await publicAxiosInstance.get('/records')
  return response
}
