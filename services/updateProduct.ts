import { Product } from '../@types/frontend.types'
import publicAxiosInstance from '../api/axios'

export const updateProduct = async ({ id, name, price }: Product) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price
  })
  return response
}
