import publicAxiosInstance from '../../api/axios-api'

export const getStores = async () => {
  const response = await publicAxiosInstance.get('/stores')
  return response
}
