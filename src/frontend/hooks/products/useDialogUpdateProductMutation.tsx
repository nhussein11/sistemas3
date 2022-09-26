import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { CategoryEnum, Product } from '@prisma/client'
import {
  defaultProductChecked,
  isProductCheckedState
} from '../../atoms/products/isProductCheckedAtom'
import {
  defaultProduct,
  selectedProductState
} from '../../atoms/products/selectedProductAtom'
import {
  showUpdateDialogDefaultState,
  showUpdateDialogState
} from '../../atoms/showUpdateDialogAtom'
import useField from '../useField'
import { updateProduct } from '../../services/products/updateProduct'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'

const useDialogUpdateProductMutation = (queryId: string) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [, setErrorState] = useRecoilState(ErrorState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setIsProductChecked] = useRecoilState(isProductCheckedState)
  const productName = useField({ initialValue: '', type: 'text' })
  const productDescription = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const [productCategory, setProductCategory] = useState('IMPRESORA')
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price, description, category }: Product) =>
    updateProduct({ id, name, price, description, category })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(showUpdateDialogDefaultState)
      setSelectedProduct(defaultProduct)
      productName.onChange('')
      productDescription.onChange('')
      setProductCategory(CategoryEnum.IMPRESORA)
      productPrice.onChange(0)
      setIsProductChecked(defaultProductChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleUpdateProduct = () => {
    mutate({
      id: selectedProduct.id,
      name: productName.value as string,
      description: productDescription.value as string,
      category: productCategory as CategoryEnum,
      price: productPrice.value as number
    })
  }
  useEffect(() => {
    productName.onChange(selectedProduct.name)
    productPrice.onChange(selectedProduct.price)
    productDescription.onChange(selectedProduct.description)
    setProductCategory(selectedProduct.category)
  }, [selectedProduct])
  return {
    handleUpdateProduct,
    productName,
    productPrice,
    productDescription,
    productCategory,
    showUpdateDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateProductMutation
