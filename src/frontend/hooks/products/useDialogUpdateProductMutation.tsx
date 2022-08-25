import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
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
import useField from '../useField'

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
  const [, setIsProductChecked] = useRecoilState(isProductCheckedState)
  const productName = useField({ initialValue: '', type: 'text' })
  const productPrice = useField({ initialValue: 0, type: 'number' })
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price }: Product) =>
    updateProduct({ id, name, price })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(false)
      setSelectedProduct(defaultProduct)
      productName.onChange('')
      productPrice.onChange(0)
      setIsProductChecked(defaultProductChecked)
    }
  })
  const handleUpdateProduct = () => {
    mutate({ id: selectedProduct.id, name: productName.value as string, price: productPrice.value as number })
  }
  useEffect(() => {
    productName.onChange(selectedProduct.name)
    productPrice.onChange(selectedProduct.price)
  }, [selectedProduct])

  return {
    handleUpdateProduct,
    productName,
    productPrice,
    showUpdateDialog,
    showErrorDialog,
    setShowErrorDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateProductMutation
