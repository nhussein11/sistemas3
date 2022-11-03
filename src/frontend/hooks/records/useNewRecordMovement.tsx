import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import { useRouter } from 'next/router'
import { isPostState } from '../../atoms/isPostState'
import { createNewRecordMovement } from '../../services/records/createNewRecordMovement'
import { defaultProduct, selectedMovProductState } from '../../atoms/records/selectedMovProductAtom'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'

const useNewRecordMovement = (queryId: string, toast: any) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  // hooks
  const [, setPosting] = useRecoilState(isPostState)
  const [selectedRecordType, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const [selectedProduct, setSelectedProduct] = useRecoilState(selectedMovProductState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const { mutate } = useMutation(createNewRecordMovement, {
    onSuccess: (data) => {
      setSelectedRecordType(defaultRecordType)
      setSelectedProduct(defaultProduct)
      setSelectedStore(defaultStore)
      queryClient.invalidateQueries([queryId])
      setPosting(false)
      toast.current.show({ severity: 'success', summary: 'Realizado', detail: 'Movimiento Generado', life: 3000 })
      setTimeout(() => {
        router.replace('/records?type=mov')
      }, 2000)
    },
    onError: (error: any) => {
      console.log(error.message)
    }
  })
  const handleCreateNewRecordMovement = () => {
    mutate({
      recordTypeId: selectedRecordType.id,
      quantity: selectedProduct.quantity as number,
      storeId: selectedStore.id,
      productId: selectedProduct.productId
    })
  }
  return {
    handleCreateNewRecordMovement
  }
}

export default useNewRecordMovement
