import publicAxiosInstance from '../api/axios'
type ProductData = {
  name: string
  price: number

}
export const createNewProduct = async (product: ProductData) => {
  const response = await publicAxiosInstance.post('/products', product)
  return response
}
