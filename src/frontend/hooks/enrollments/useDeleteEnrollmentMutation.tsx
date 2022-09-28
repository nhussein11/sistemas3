import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteEnrollment } from '../../services/enrollments/deleteEnrollment'
import { defaultEnrollmentChecked, isEnrollmentCheckedState } from '../../atoms/enrollments/isEnrollmentSelected'
import { defaultEnrollment, selectedEnrollmentState } from '../../atoms/enrollments/selectedEnrollmentAtom'

const useDeleteEnrollmentMutation = (queryId: string) => {
  const [, setIsEnrollmentCheckedState] = useRecoilState(
    isEnrollmentCheckedState
  )
  const [, setSelectedEnrollment] = useRecoilState(
    selectedEnrollmentState
  )
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (enrollmentId: string) => deleteEnrollment(enrollmentId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedEnrollment(defaultEnrollment)
        setIsEnrollmentCheckedState(defaultEnrollmentChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error: any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteEnrollment = (id:string) => {
    mutate(id)
  }
  return {
    handleDeleteEnrollment
  }
}

export default useDeleteEnrollmentMutation
