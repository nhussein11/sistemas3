import { Store } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import {
  defaultStoreChecked,
  isStoreCheckedState
} from '../../atoms/stores/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { showUpdateDialogDefaultState, showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import { updateStore } from '../../services/stores/updateStore'
import useField from '../useField'

const useDialogUpdateStoreMutation = (queryId: string) => {
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [_, setIsStoreChecked] = useRecoilState(isStoreCheckedState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [showErrorDialog, setShowErrorDialog] =
    useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const storeName = useField({ initialValue: '', type: 'text' })
  const storeAddress = useField({ initialValue: '', type: 'text' })
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, address }: Store) =>
    updateStore({ id, name, address })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(showUpdateDialogDefaultState)
      setSelectedStore(defaultStore)
      storeName.onChange('')
      storeAddress.onChange('')
      setIsStoreChecked(defaultStoreChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  useEffect(() => {
    storeName.onChange(selectedStore.name)
    storeAddress.onChange(selectedStore.address)
  }, [selectedStore])
  const handleUpdateStore = () => {
    mutate({
      id: selectedStore.id,
      name: storeName.value as string,
      address: storeAddress.value as string
    })
  }
  return {
    handleUpdateStore,
    storeName,
    storeAddress,
    showUpdateDialog,
    showErrorDialog,
    setShowErrorDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateStoreMutation
