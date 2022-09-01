import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultStoreChecked, isStoreCheckedState } from '../../atoms/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/selectedStoreAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { deleteStore } from '../../services/stores/deleteStore'

const useDeleteStoreMutation = (queryId: string) => {
  const [_, setIsStoreChecked] = useRecoilState(isStoreCheckedState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: string) => deleteStore(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedStore(defaultStore)
        setIsStoreChecked(defaultStoreChecked)
      },
      onError: () => {
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteStore = () => {
    mutate(selectedStore.id)
  }
  return {
    handleDeleteStore
  }
}

export default useDeleteStoreMutation
