import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { defaultStockChecked, isStockCheckedState } from '../../atoms/stock/isStockSelectedAtom'
import { defaultStock, selectedStockState } from '../../atoms/stock/selectedStockAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteStock } from '../../services/stock/deleteStock'

const useDeleteStockMutation = (queryId:string) => {
  const [, setIsStockChecked] = useRecoilState(isStockCheckedState)
  const [selectedStock, setSelectedStock] = useRecoilState(selectedStockState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (stockId: string) => deleteStock(stockId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedStock(defaultStock)
        setIsStockChecked(defaultStockChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error:any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteStock = () => {
    mutate(selectedStock.id)
  }
  return {
    handleDeleteStock
  }
}

export default useDeleteStockMutation
