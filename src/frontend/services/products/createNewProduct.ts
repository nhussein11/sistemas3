import publicAxiosInstance from '../../api/axios-api'
type ProductData = {
  name: string
  description: string
  category: string
  price: number
}
export const createNewProduct = async (product: ProductData) => {
  const response = await publicAxiosInstance.post('/products', product)
  return response
}
