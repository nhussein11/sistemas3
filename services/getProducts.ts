import publicAxiosInstance from '../api/axios'

export const getProducts = async () => {
  const response = await publicAxiosInstance.get('/products')
  return response
}
