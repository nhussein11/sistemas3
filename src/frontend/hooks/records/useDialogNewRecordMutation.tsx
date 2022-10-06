import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { RecordType, Store, Stock } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { createNewRecord } from '../../services/records/createNewRecord'
import useRecordTypesQuery from './useRecordTypesQuery'
import useStoresQuery from '../stores/useStoresQuery'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import { defaultRecordDetails, selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
import useStocksQuery from '../stock/useStocksQuery'
import { ParseRecordDetails } from '../../services/records/parseRecordDetails'
import useProductsQuery from '../products/useProductsQuery'

const useDialogNewRecordMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const recordTypesQuery = useRecordTypesQuery('record-types')
  const storesQuery = useStoresQuery('stores')
  const stocksQuery = useStocksQuery('stocks')
  const productsQuery = useProductsQuery('products')
  const [selectedRecordDetails, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [selectedRecordType, setSelectedRecordType] = useState({
    id: '',
    recordType: '',
    recordName: '',
    cause: ''
  })
  const changeRecordType = (name: string) => {
    const recordType = recordTypesQuery.data?.recordsTypes.find(
      (recordType: RecordType) => recordType.recordName === name
    )
    setSelectedRecordType(recordType)
  }
  const changeStore = (name: string) => {
    setSelectedStore(
      storesQuery.data?.stores.find((store: Store) => store.name === name)
    )
  }
  const { mutate } = useMutation(createNewRecord, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      recordObservation.onChange('')
      recordSenderName.onChange('')
      recordAdress.onChange('')
      setSelectedRecordType({
        id: '',
        recordType: '',
        recordName: '',
        cause: ''
      })
      setSelectedRecordDetails(defaultRecordDetails)
      setSelectedStore(defaultStore)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const recordObservation = useField({ initialValue: '', type: 'text' })
  const recordSenderName = useField({ initialValue: '', type: 'text' })
  const recordAdress = useField({ initialValue: '', type: 'text' })
  const handleCreateNewRecord = () => {
    mutate({
      observation: recordObservation.value as string,
      senderName: recordSenderName.value as string,
      address: recordAdress.value as string,
      recordTypeId: selectedRecordType.id,
      details: ParseRecordDetails(selectedRecordDetails, productsQuery)
    })
  }
  const recordTypesOptions = recordTypesQuery?.data?.recordsTypes.map(
    (recordTypes: RecordType) => recordTypes.recordName
  )
  const storesOptions = storesQuery?.data?.stores.map(
    (store: Store) => store.name
  )
  const stockOptions = stocksQuery?.data?.stocks.filter(
    (stock: Stock) => stock.storeId === selectedStore.id
  )
  return {
    handleCreateNewRecord,
    recordObservation,
    changeRecordType,
    selectedRecordType,
    selectedStore,
    changeStore,
    recordTypesOptions,
    storesOptions,
    stockOptions,
    recordSenderName,
    recordAdress
  }
}

export default useDialogNewRecordMutation
