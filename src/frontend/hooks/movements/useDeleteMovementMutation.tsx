import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { defaultMovement, selectedMovementState } from '../../atoms/movements/selectedMovementAtom'
import { defaultMovementChecked, isSMovementCheckedState } from '../../atoms/movements/setSelectedMovementAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteMovement } from '../../services/movements/deleteMovement'

const useDeleteMovementMutation = (queryId: string) => {
  const [, setIsMovementChecked] = useRecoilState(isSMovementCheckedState)
  const [selectedMovement, setSelectedMovement] = useRecoilState(
    selectedMovementState
  )
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (movementId: string) => deleteMovement(movementId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedMovement(defaultMovement)
        setIsMovementChecked(defaultMovementChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error:any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteMovement = () => {
    mutate(selectedMovement.id)
  }
  return {
    handleDeleteMovement
  }
}

export default useDeleteMovementMutation
