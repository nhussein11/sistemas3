import publicAxiosInstance from '../../api/axios-api'

export const getStocks = async () => {
  const response = await publicAxiosInstance.get('/stock')
  return response
}
