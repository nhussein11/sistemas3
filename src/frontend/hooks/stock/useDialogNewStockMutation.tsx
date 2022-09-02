import { Product, Store } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { createNewStock } from '../../services/stock/createNewStock'
import useProductsQuery from '../products/useProductsQuery'
import useStoresQuery from '../stores/useStoresQuery'
import useField from '../useField'

const useDialogNewStockMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const quantity = useField({ initialValue: 0, type: 'number' })
  const minQuantity = useField({ initialValue: 0, type: 'number' })
  const queryClient = useQueryClient()
  const storesQuery = useStoresQuery('stores')
  const productsQuery = useProductsQuery('products')
  const [selectedStore, setSelectedStore] = useState({
    id: '',
    name: '',
    address: ''
  })
  const [selectedProduct, setSelectedProduct] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    price: 0
  })
  const { mutate } = useMutation(createNewStock, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      quantity.onChange(0)
      minQuantity.onChange(0)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleCreateNewStock = () => {
    mutate({
      quantity: quantity.value as number,
      minQuantity: minQuantity.value as number,
      storeId: selectedStore.id,
      productId: selectedProduct.id
    })
  }
  const changeStore = (name: string) => {
    setSelectedStore(
      storesQuery.data?.stores.find((store: Store) => store.name === name)
    )
  }
  const changeProduct = (name: string) => {
    setSelectedProduct(
      productsQuery.data?.products.find(
        (product: Product) => product.name === name
      )
    )
  }
  return {
    handleCreateNewStock,
    quantity,
    minQuantity,
    storesQuery,
    productsQuery,
    changeStore,
    selectedStore,
    selectedProduct,
    changeProduct
  }
}

export default useDialogNewStockMutation
