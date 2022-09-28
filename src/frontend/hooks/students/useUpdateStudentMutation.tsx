import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  showUpdateDialogDefaultState,
  showUpdateDialogState
} from '../../atoms/showUpdateDialogAtom'
import useField from '../useField'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { updateStudent } from '../../services/students/updateStudent'
import {
  defaultStudent,
  selectedStudentState
} from '../../atoms/students/selectedStudentAtom'
import { Student } from '@prisma/client'
import {
  defaultStudentChecked,
  isStudentCheckedState
} from '../../atoms/students/isStudentSelected'

const useUpdateStudentMutation = (queryId: string) => {
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [, setErrorState] = useRecoilState(ErrorState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setIsStudentChecked] = useRecoilState(isStudentCheckedState)
  const studentName = useField({ initialValue: '', type: 'text' })
  const studentSurname = useField({ initialValue: '', type: 'text' })
  const studentIdentificationNumber = useField({
    initialValue: 0,
    type: 'number'
  })
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, surname, identificationNumber }: Student) =>
    updateStudent({ id, name, surname, identificationNumber })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(showUpdateDialogDefaultState)
      setSelectedStudent(defaultStudent)
      studentName.onChange('')
      studentSurname.onChange('')
      studentIdentificationNumber.onChange(0)
      setIsStudentChecked(defaultStudentChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleUpateStudent = () => {
    mutate({
      id: selectedStudent.id,
      name: studentName.value as string,
      surname: studentSurname.value as string,
      identificationNumber: studentIdentificationNumber.value as number
    })
  }
  useEffect(() => {
    studentName.onChange(selectedStudent.name)
    studentSurname.onChange(selectedStudent.surname)
    studentIdentificationNumber.onChange(selectedStudent.identificationNumber)
  }, [selectedStudent])
  return {
    handleUpateStudent,
    studentName,
    studentSurname,
    studentIdentificationNumber,
    showUpdateDialog,
    setShowUpdateDialog
  }
}

export default useUpdateStudentMutation
