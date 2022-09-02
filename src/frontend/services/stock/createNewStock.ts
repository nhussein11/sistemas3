import publicAxiosInstance from '../../api/axios-api'
type StockData = {
  productId: string
  storeId: string
  quantity: number
  minQuantity: number

}
export const createNewStock = async (stock: StockData) => {
  const response = await publicAxiosInstance.post('/stock', stock)
  return response
}
