import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteProduct } from '../services/deleteProducts'

const useTableMutations = () => {
  const [selectedProduct, setSelectedProduct] = useState('')
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: string) => deleteProduct(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['products'])
        setSelectedProduct('')
      }
    }
  )
  const handleDeleteProduct = () => {
    mutate(selectedProduct)
  }
  return {
    selectedProduct,
    setSelectedProduct,
    handleDeleteProduct
  }
}

export default useTableMutations
