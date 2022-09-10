import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { defaultStoreChecked, isStoreCheckedState } from '../../atoms/stores/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteStore } from '../../services/stores/deleteStore'

const useDeleteStoreMutation = (queryId: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setIsStoreChecked] = useRecoilState(isStoreCheckedState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (productId: string) => deleteStore(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedStore(defaultStore)
        setIsStoreChecked(defaultStoreChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error:any) => {
        setErrorState({ status: error.response.status, message: error.message })
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
