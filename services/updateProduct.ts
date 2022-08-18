import publicAxiosInstance from '../api/axios'

export const updateProduct = async ({
  id,
  name,
  price
}: {
  id: string
  name: string
  price: number
}) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price
  })
  return response
}
