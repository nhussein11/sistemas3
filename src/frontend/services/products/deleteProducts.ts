import publicAxiosInstance from '../../api/axios-api'
export const deleteProduct = async (productId: string) => {
  const response = await publicAxiosInstance.delete(
    `/products/${productId}`,
    {}
  )
  return response
}
