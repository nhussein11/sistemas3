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
  // eslint-disable-next-line no-unused-vars
  const [_, setIsStudentChecked] = useRecoilState(isStudentCheckedState)
  const [selectedStudent, setSelectedStudent] =
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
  const handleDeleteStudent = () => {
    mutate(selectedStudent.id)
  }
  return {
    handleDeleteStudent
  }
}

export default useDeleteStudentMutation
