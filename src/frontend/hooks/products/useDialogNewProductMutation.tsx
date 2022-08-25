import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createNewProduct } from '../../services/createNewProduct'
import useField from '../useField'

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
  const productName = useField('', 'text')
  //const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  // description and other when backend is ready
  const handleCreateNewProduct = () => {
    mutate({
      name: productName.value,
      price: productPrice
    })
  }
  return {
    handleCreateNewProduct,
    productName,
    setProductPrice,
    productPrice
  }
}

export default useDialogNewProductMutation
