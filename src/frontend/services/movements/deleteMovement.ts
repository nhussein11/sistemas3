import publicAxiosInstance from '../../api/axios-api'

export const deleteMovement = async (id: string) => {
  const response = await publicAxiosInstance.delete(`/movements/${id}`)
  return response
}
