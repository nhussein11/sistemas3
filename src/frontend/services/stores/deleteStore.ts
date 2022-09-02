import publicAxiosInstance from '../../api/axios-api'

export const deleteStore = async (storeId: string) => {
  const response = await publicAxiosInstance.delete(`/stores/${storeId}`, {})
  return response
}
