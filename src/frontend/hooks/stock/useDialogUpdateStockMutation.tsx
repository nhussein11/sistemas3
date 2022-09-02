import { Store } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { StockUpdateData } from '../../@types/frontend.types'
import {
  defaultStockChecked,
  isStockCheckedState
} from '../../atoms/isStockSelectedAtom'
import { defaultStock, selectedStockState } from '../../atoms/selectedStockAtom'
import { defaultStore } from '../../atoms/selectedStoreAtom'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import { updateStock } from '../../services/stock/updateStock'
import { findStore } from '../../services/stores/findStore'
import useStoresQuery from '../stores/useStoresQuery'
import useField from '../useField'

const useDialogUpdateStockMutation = (queryId: string) => {
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
    minQuantity
  }: StockUpdateData) => updateStock({ id, storeId, quantity, minQuantity })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(false)
      setSelectedStore(defaultStore)
      setSelectedStock(defaultStock)
      quantity.onChange(0)
      minQuantity.onChange(0)
      setIsStockChecked(defaultStockChecked)
    }
  })
  useEffect(() => {
    quantity.onChange(selectedStock.quantity)
    minQuantity.onChange(selectedStock.minQuantity)
    setSelectedStore(findStore(selectedStock.storeId, storesQuery) as Store)
  }, [selectedStock])
  const handleUpdateStock = () => {
    mutate({
      id: selectedStock.id,
      storeId: selectedStore.id as string,
      quantity: quantity.value as number,
      minQuantity: minQuantity.value as number
    })
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
