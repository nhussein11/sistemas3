import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { useRecoilState } from 'recoil'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { createNewCourse } from '../../services/courses/createNewCourse'
const useDialogNewCourseMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(createNewCourse, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      courseName.onChange('')
      courseDescription.onChange('')
      coursePrice.onChange(0)
      courseHours.onChange(0)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const courseName = useField({ initialValue: '', type: 'text' })
  const coursePrice = useField({ initialValue: 0, type: 'number' })
  const courseHours = useField({ initialValue: 0, type: 'number' })
  const courseDescription = useField({ initialValue: '', type: 'text' })
  const handleCreateNewCourse = () => {
    mutate({
      name: courseName.value as string,
      price: coursePrice.value as number,
      description: courseDescription.value as string,
      hoursQuantity: courseHours.value as number
    })
  }
  return {
    handleCreateNewCourse,
    courseName,
    coursePrice,
    courseDescription,
    courseHours
  }
}

export default useDialogNewCourseMutation
