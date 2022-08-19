import { Product } from '../../shared/schemas/product.type'
import publicAxiosInstance from '../axios-api/axios-api'

export const updateProduct = async ({ id, name, price }: Product) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price
  })
  return response
}
