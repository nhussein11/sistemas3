import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { defaultRecord, selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import { defaultRecordChecked, isSRecordCheckedState } from '../../atoms/records/setSelectedRecordAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteRecord } from '../../services/records/deleteRecord'

const useDeleteRecordMutation = (queryId: string) => {
  const [, setIsRecordChecked] = useRecoilState(isSRecordCheckedState)
  const [selectedRecord, setSelectedRecord] = useRecoilState(
    selectedRecordState
  )
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (recordId: string) => deleteRecord(recordId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedRecord(defaultRecord)
        setIsRecordChecked(defaultRecordChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error:any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteRecord = () => {
    mutate(selectedRecord.id)
  }
  return {
    handleDeleteRecord
  }
}

export default useDeleteRecordMutation
