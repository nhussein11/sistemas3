import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Product } from '../../../shared/schemas/product.type'
import { CategoryEnum } from '@prisma/client'
import {
  defaultProductChecked,
  isProductCheckedState
} from '../../atoms/isProductCheckedAtom'
import {
  defaultProduct,
  selectedProductState
} from '../../atoms/selectedProductAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import useField from '../useField'
import { updateProduct } from '../../services/products/updateProduct'

const useDialogUpdateProductMutation = (queryId: string) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  const [showErrorDialog, setShowErrorDialog] =
    useRecoilState(showErrorDialogState)
  // eslint-disable-next-line no-unused-vars
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
      setShowUpdateDialog(false)
      setSelectedProduct(defaultProduct)
      productName.onChange('')
      productDescription.onChange('')
      setProductCategory(CategoryEnum.IMPRESORA)
      productPrice.onChange(0)
      setIsProductChecked(defaultProductChecked)
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
  console.log(selectedProduct.category)
  return {
    handleUpdateProduct,
    productName,
    productPrice,
    productDescription,
    productCategory,
    showUpdateDialog,
    showErrorDialog,
    setShowErrorDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateProductMutation
