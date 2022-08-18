import publicAxiosInstance from '../api/axios'
export const deleteProduct = async (productId: string) => {
  const response = await publicAxiosInstance.delete(
    `/products/${productId}`,
    {}
  )
  return response
}
