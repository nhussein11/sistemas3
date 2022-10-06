import publicAxiosInstance from '../../api/axios-api'

export const getCustomers = async () => {
  const response = await publicAxiosInstance.get('/customers')
  return response
}
