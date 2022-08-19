import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Product } from '../@types/frontend.types'
import { isProductCheckedState } from '../atoms/isProductCheckedAtom'
import { selectedProductState } from '../atoms/selectedProductAtom'
import { showUpdateDialogState } from '../atoms/showUpdateDialogAtom'
import { updateProduct } from '../services/updateProduct'

const useDialogUpdateProduct = () => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [_, setIsProductChecked] = useRecoilState(isProductCheckedState)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price }: Product) =>
    updateProduct({ id, name, price })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['products'])
      setShowUpdateDialog(false)
      setSelectedProduct({
        id: '',
        name: '',
        price: 0
      })
      setProductName('')
      setProductPrice(0)
      setIsProductChecked({ id: '', checked: false })
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
    setShowUpdateDialog
  }
}

export default useDialogUpdateProduct
