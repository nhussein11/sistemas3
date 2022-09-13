import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { RecordType, Store } from '@prisma/client'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { createNewRecord } from '../../services/records/createNewRecord'
import useRecordTypesQuery from './useRecordTypesQuery'
import { ParseRecordDetails } from '../../services/records/parseRecordDetails'
import useStoresQuery from '../stores/useStoresQuery'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import useProductsQuery from '../products/useProductsQuery'
import { defaultRecordDetails, selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
const useDialogNewRecordMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const recordTypesQuery = useRecordTypesQuery('mecord-types')
  const storesQuery = useStoresQuery('stores')
  const productsQuery = useProductsQuery('products')
  const [selectedRecordDetails, setSelectedRecordDetails] = useRecoilState(
    selectedRecordDetailsState
  )
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [selectedRecordType, setSelectedRecordType] = useState({
    id: '',
    mecordType: '',
    mecordName: '',
    cause: ''
  })
  const changeRecordType = (name: string) => {
    const recordType = recordTypesQuery.data?.recordsTypes.find(
      (mecordType: RecordType) => recordType.recordName === name
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
      mecordObservation.onChange('')
      setSelectedRecordType({
        id: '',
        mecordType: '',
        mecordName: '',
        cause: ''
      })
      setSelectedRecordDetails(defaultRecordDetails)
      setSelectedStore(defaultStore)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      console.log(error)
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const mecordObservation = useField({ initialValue: '', type: 'text' })
  const handleCreateNewRecord = () => {
    mutate({
      observation: mecordObservation.value as string,
      recordTypeId: selectedRecordType.id,
      details: ParseRecordDetails(selectedRecordDetails),
      storeId: selectedStore.id
    })
  }
  const mecordTypesOptions = recordTypesQuery?.data?.recordsTypes.map(
    (mecordTypes: RecordType) => mecordTypes.recordName
  )
  const storesOptions = storesQuery?.data?.stores.map(
    (store: Store) => store.name
  )
  const productsOptions = productsQuery?.data?.products
  return {
    handleCreateNewRecord,
    mecordObservation,
    changeRecordType,
    selectedRecordType,
    selectedStore,
    changeStore,
    mecordTypesOptions,
    storesOptions,
    productsOptions
  }
}

export default useDialogNewRecordMutation
