import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewStore } from '../../services/stores/createNewStore'
import useField from '../useField'

const useDialogNewStoreMutation = (queryId: string) => {
  const storeName = useField({ initialValue: '', type: 'text' })
  const storeAddress = useField({ initialValue: '', type: 'text' })
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewStore, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      storeName.onChange('')
      storeAddress.onChange('')
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
