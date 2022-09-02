import { StockUpdateData } from '../../@types/frontend.types'
import publicAxiosInstance from '../../api/axios-api'

export const updateStock = async ({
  id,
  storeId,
  quantity,
  minQuantity
}: StockUpdateData) => {
  const response = await publicAxiosInstance.put(`/stock/${id}`, {
    storeId,
    quantity,
    minQuantity
  })
  return response
}
