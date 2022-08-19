import publicAxiosInstance from '../axios-api/axios-api'

export const getProducts = async () => {
  const response = await publicAxiosInstance.get('/products')
  return response
}
