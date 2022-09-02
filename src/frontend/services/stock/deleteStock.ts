import publicAxiosInstance from '../../api/axios-api'

export const deleteStock = async (stockId: string) => {
  const response = await publicAxiosInstance.delete(`/stock/${stockId}`, {})
  return response
}
