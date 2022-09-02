import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/ErrorAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { createNewStore } from '../../services/stores/createNewStore'
import useField from '../useField'

const useDialogNewStoreMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const storeName = useField({ initialValue: '', type: 'text' })
  const storeAddress = useField({ initialValue: '', type: 'text' })
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewStore, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      storeName.onChange('')
      storeAddress.onChange('')
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })

  const handleCreateNewStore = () => {
    mutate({
      name: storeName.value as string,
      address: storeAddress.value as string
    })
  }

  return {
    handleCreateNewStore,
    storeName,
    storeAddress
  }
}

export default useDialogNewStoreMutation
