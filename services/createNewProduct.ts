import publicAxiosInstance from '../api/axios'
type Product = {
  name: string
  price: number
  id: string
}
export const createNewProduct = async (product: Product) => {
  const response = await publicAxiosInstance.post('/products', product)
  return response
}
