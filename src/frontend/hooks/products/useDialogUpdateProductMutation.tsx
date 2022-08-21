import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Product } from '../../../shared/schemas/product.type'
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
import { updateProduct } from '../../services/updateProduct'

const useDialogUpdateProductMutation = (queryId: string) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  const [showErrorDialog, setShowErrorDialog] = useRecoilState(
    showErrorDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [isProductChecked, setIsProductChecked] = useRecoilState(isProductCheckedState)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price }: Product) =>
    updateProduct({ id, name, price })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(false)
      setSelectedProduct(defaultProduct)
      setProductName('')
      setProductPrice(0)
      setIsProductChecked(defaultProductChecked)
    },
    onError: () => {
      console.log('error')
      setShowErrorDialog(true)
    }
  })
  const handleUpdateProduct = () => {
    mutate({ id: selectedProduct.id, name: productName, price: productPrice })
  }
  useEffect(() => {
    setProductName(selectedProduct.name)
    setProductPrice(selectedProduct.price)
  }, [selectedProduct])

  return {
    handleUpdateProduct,
    productName,
    productPrice,
    setProductName,
    setProductPrice,
    showUpdateDialog,
    showErrorDialog,
    setShowErrorDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateProductMutation
