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
import {
  StudentUpdateData,
  updateStudent
} from '../../services/students/updateStudent'
import {
  defaultStudent,
  selectedStudentState
} from '../../atoms/students/selectedStudentAtom'
import {
  defaultStudentChecked,
  isStudentCheckedState
} from '../../atoms/students/isStudentSelected'
import { parseDate } from '../../services/records/parseDate'
const useUpdateStudentMutation = (queryId: string) => {
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  const [, setErrorState] = useRecoilState(ErrorState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setIsStudentChecked] = useRecoilState(isStudentCheckedState)
  const studentName = useField({ initialValue: '', type: 'text' })
  const studentSurname = useField({ initialValue: '', type: 'text' })
  const studentIdentificationNumber = useField({
    initialValue: 0,
    type: 'number'
  })
  const studentEmail = useField({ initialValue: '', type: 'email' })
  const studentPhone = useField({ initialValue: 0, type: 'number' })
  const studentBirthDate = useField({ initialValue: '', type: 'date' })
  const queryClient = useQueryClient()
  const updateQuery = ({
    id,
    name,
    surname,
    identificationNumber,
    birth,
    phone,
    email
  }: StudentUpdateData) =>
    updateStudent({
      id,
      name,
      surname,
      identificationNumber,
      birth,
      phone,
      email
    })
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
  const handleUpdateStudent = () => {
    mutate({
      id: selectedStudent.id,
      name: studentName.value as string,
      surname: studentSurname.value as string,
      identificationNumber: studentIdentificationNumber.value as number,
      email: studentEmail.value as string,
      phone: studentPhone.value as number,
      birth: studentBirthDate.value as string
    })
  }
  useEffect(() => {
    studentName.onChange(selectedStudent.name)
    studentSurname.onChange(selectedStudent.surname)
    studentIdentificationNumber.onChange(selectedStudent.identificationNumber)
    studentEmail.onChange(selectedStudent.email)
    studentPhone.onChange(selectedStudent.phone)
    studentBirthDate.onChange(parseDate(selectedStudent.birth.toString(), true))
  }, [selectedStudent])
  return {
    handleUpdateStudent,
    studentName,
    studentSurname,
    studentIdentificationNumber,
    studentEmail,
    studentPhone,
    studentBirthDate,
    showUpdateDialog,
    setShowUpdateDialog
  }
}

export default useUpdateStudentMutation
