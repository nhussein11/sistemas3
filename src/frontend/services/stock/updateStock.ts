import { StockUpdateData } from '../../@types/frontend.types'
import publicAxiosInstance from '../../api/axios-api'

export const updateStock = async ({
  id,
  productId,
  storeId,
  quantity,
  minQuantity
}: StockUpdateData) => {
  console.log({
    id,
    productId,
    storeId,
    quantity,
    minQuantity
  })
  const response = await publicAxiosInstance.put(`/stock/${id}`, {
    storeId,
    quantity,
    minQuantity,
    productId
  })
  return response
}
