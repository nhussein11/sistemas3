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
      productDescription.onChange('')
      productPrice.onChange(0)
    }
  })
  const productName = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const productDescription = useField({ initialValue: '', type: 'text' })
  const handleCreateNewProduct = () => {
    mutate({
      name: productName.value as string,
      price: productPrice.value as number,
      description: productDescription.value as string
    })
  }
  return {
    handleCreateNewProduct,
    productName,
    productPrice,
    productDescription
  }
}

export default useDialogNewProductMutation
