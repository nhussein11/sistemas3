import publicAxiosInstance from '../../api/axios-api'

export const getSuppliers = async () => {
  const response = await publicAxiosInstance.get('/suppliers')
  return response
}
