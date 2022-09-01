import publicAxiosInstance from '../../api/axios-api'

export const getProducts = async () => {
  const response = await publicAxiosInstance.get('/products')
  return response
}
