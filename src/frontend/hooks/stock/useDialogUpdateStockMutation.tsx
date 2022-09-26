import { Store } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { StockUpdateData } from '../../@types/frontend.types'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import {
  defaultStockChecked,
  isStockCheckedState
} from '../../atoms/stock/isStockSelectedAtom'
import {
  defaultStock,
  selectedStockState
} from '../../atoms/stock/selectedStockAtom'
import { defaultStore } from '../../atoms/stores/selectedStoreAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import {
  showUpdateDialogDefaultState,
  showUpdateDialogState
} from '../../atoms/showUpdateDialogAtom'
import { updateStock } from '../../services/stock/updateStock'
import { findStore } from '../../services/stores/findStore'
import useStoresQuery from '../stores/useStoresQuery'
import useField from '../useField'

const useDialogUpdateStockMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  const [selectedStock, setSelectedStock] = useRecoilState(selectedStockState)
  const [, setIsStockChecked] = useRecoilState(isStockCheckedState)
  const quantity = useField({ initialValue: 0, type: 'number' })
  const minQuantity = useField({ initialValue: 0, type: 'number' })
  const queryClient = useQueryClient()
  const storesQuery = useStoresQuery('stores')
  const [selectedStore, setSelectedStore] = useState({
    id: '',
    name: '',
    address: ''
  })
  const updateQuery = ({
    id,
    storeId,
    quantity,
    minQuantity,
    productId
  }: StockUpdateData) =>
    updateStock({ id, storeId, quantity, minQuantity, productId })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(showUpdateDialogDefaultState)
      setSelectedStore(defaultStore)
      setSelectedStock(defaultStock)
      quantity.onChange(0)
      minQuantity.onChange(0)
      setIsStockChecked(defaultStockChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  useEffect(() => {
    quantity.onChange(selectedStock.quantity)
    minQuantity.onChange(selectedStock.minQuantity)
    setSelectedStore(findStore(selectedStock.storeId, storesQuery) as Store)
  }, [selectedStock])
  const handleUpdateStock = () => {
    let mutateOptions: StockUpdateData
    if (showUpdateDialog.updateMode === 'stockUpdate') {
      mutateOptions = {
        id: selectedStock.id,
        minQuantity: minQuantity.value as number
      }
    } else {
      mutateOptions = {
        id: selectedStock.id,
        storeId: selectedStore.id as string,
        quantity: quantity.value as number,
        productId: selectedStock.productId
      }
    }
    mutate(mutateOptions)
  }
  const changeStore = (name: string) => {
    setSelectedStore(
      storesQuery.data?.stores.find((store: Store) => store.name === name)
    )
  }
  return {
    handleUpdateStock,
    quantity,
    minQuantity,
    storesQuery,
    changeStore,
    showUpdateDialog,
    setShowUpdateDialog,
    selectedStore
  }
}

export default useDialogUpdateStockMutation
