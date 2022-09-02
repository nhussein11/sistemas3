import { Store } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  defaultStoreChecked,
  isStoreCheckedState
} from '../../atoms/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/selectedStoreAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
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
  const storeName = useField({ initialValue: '', type: 'text' })
  const storeAddress = useField({ initialValue: '', type: 'text' })
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, address }: Store) =>
    updateStore({ id, name, address })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(false)
      setSelectedStore(defaultStore)
      storeName.onChange('')
      storeAddress.onChange('')
      setIsStoreChecked(defaultStoreChecked)
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
