import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Product } from '../@types/frontend.types'
import { selectedProductState } from '../atoms/selectedProductAtom'
import { showUpdateDialogState } from '../atoms/showUpdateDialogAtom'
import { updateProduct } from '../services/updateProduct'

const useDialogUpdateProduct = () => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
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
    }
  })
  const handleUpdateProduct = () => {
    mutate({ id: selectedProduct.id, name: productName, price: productPrice })
  }
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
