import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'

import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { deleteStudent } from '../../services/students/deleteStudent'
import {
  defaultStudent,
  selectedStudentState
} from '../../atoms/students/selectedStudentAtom'
import {
  defaultStudentChecked,
  isStudentCheckedState
} from '../../atoms/students/isStudentSelected'

const useDeleteStudentMutation = (queryId: string) => {
  const [, setIsStudentChecked] = useRecoilState(isStudentCheckedState)
  const [, setSelectedStudent] =
    useRecoilState(selectedStudentState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (studentId: string) => deleteStudent(studentId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries([queryId])
        setSelectedStudent(defaultStudent)
        setIsStudentChecked(defaultStudentChecked)
        setErrorState(defaultErrorState)
      },
      onError: (error: any) => {
        setErrorState({ status: error.response.status, message: error.message })
        setShowErrorDialog(true)
      }
    }
  )
  const handleDeleteStudent = (id:string) => {
    mutate(id)
  }
  return {
    handleDeleteStudent
  }
}

export default useDeleteStudentMutation
