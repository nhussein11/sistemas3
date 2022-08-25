import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewProduct } from '../../services/createNewProduct'
import useField from '../useField'

const useDialogNewProductMutation = (queryId: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      productName.onChange('')
      productPrice.onChange(0)
    }
  })
  const productName = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const handleCreateNewProduct = () => {
    mutate({
      name: productName.value as string,
      price: productPrice.value as number
    })
  }
  return {
    handleCreateNewProduct,
    productName,
    productPrice
  }
}

export default useDialogNewProductMutation
