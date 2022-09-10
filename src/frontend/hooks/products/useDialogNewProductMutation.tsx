import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { CategoryEnum } from '@prisma/client'
import { useState } from 'react'
import { createNewProduct } from '../../services/products/createNewProduct'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'

const useDialogNewProductMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      productName.onChange('')
      productDescription.onChange('')
      setCategory(CategoryEnum.IMPRESORA)
      productPrice.onChange(0)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const productName = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const productDescription = useField({ initialValue: '', type: 'text' })
  const [category, setCategory] = useState(CategoryEnum.IMPRESORA)
  const CATEGORIES = [CategoryEnum.IMPRESORA, CategoryEnum.FILAMENTO]
  const handleCreateNewProduct = () => {
    mutate({
      name: productName.value as string,
      price: productPrice.value as number,
      description: productDescription.value as string,
      category
    })
  }
  return {
    handleCreateNewProduct,
    productName,
    productPrice,
    productDescription,
    category,
    setCategory,
    CATEGORIES
  }
}

export default useDialogNewProductMutation
