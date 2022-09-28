import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { createNewStudent } from '../../services/students/createNewStudent'
const useDialogNewStudentMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewStudent, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      studentName.onChange('')
      studentSurname.onChange('')
      studentIdentificationNumber.onChange(0)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const studentName = useField({ initialValue: '', type: 'text' })
  const studentSurname = useField({ initialValue: '', type: 'text' })
  const studentIdentificationNumber = useField({ initialValue: 0, type: 'number' })
  const handleCreateNewCourse = () => {
    mutate({
      name: studentName.value as string,
      surname: studentSurname.value as string,
      identificationNumber: studentIdentificationNumber.value as number
    })
  }
  return {
    handleCreateNewCourse,
    studentName,
    studentSurname,
    studentIdentificationNumber
  }
}

export default useDialogNewStudentMutation
