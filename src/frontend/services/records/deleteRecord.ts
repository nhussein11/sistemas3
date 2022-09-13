import publicAxiosInstance from '../../api/axios-api'

export const deleteRecord = async (id: string) => {
  const response = await publicAxiosInstance.delete(`/records/${id}`)
  return response
}
