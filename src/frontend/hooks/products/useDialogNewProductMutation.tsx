import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createNewProduct } from '../../services/createNewProduct'

const useDialogNewProductMutation = (queryId: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setProductName('')
      setProductPrice(0)
    }
  })
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  // description and other when backend is ready
  const handleCreateNewProduct = () => {
    mutate({
      name: productName,
      price: productPrice
    })
  }
  return {
    handleCreateNewProduct,
    setProductName,
    setProductPrice,
    productName,
    productPrice
  }
}

export default useDialogNewProductMutation
