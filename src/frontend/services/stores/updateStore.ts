import { Store } from '@prisma/client'
import publicAxiosInstance from '../../api/axios-api'

export const updateStore = async ({ id, name, address }: Store) => {
  const response = await publicAxiosInstance.put(`/stores/${id}`, {
    name,
    address
  })
  return response
}
