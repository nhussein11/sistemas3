import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultStockChecked, isStockCheckedState } from '../../atoms/isStockSelectedAtom'
import { defaultStock, selectedStockState } from '../../atoms/selectedStockAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { deleteStock } from '../../services/stock/deleteStock'

const useDeleteStockMutation = (queryId:string) => {
  const [_, setIsStockChecked] = useRecoilState(isStockCheckedState)
  const [selectedStock, setSelectedStock] = useRecoilState(selectedStockState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (stockId: string) => deleteStock(stockId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedStock(defaultStock)
        setIsStockChecked(defaultStockChecked)
      },
      onError: () => {
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
