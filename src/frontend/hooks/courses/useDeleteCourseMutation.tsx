import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'

import { showErrorDialogState } from '../../atoms/error/showErrorDialog'

import {
  defaultCourseChecked,
  isCourseCheckedState
} from '../../atoms/courses/isCourseCheckedAtom'
import { deleteCourse } from '../../services/courses/deleteCourse'
import {
  defaultCourse,
  selectedCourseState
} from '../../atoms/courses/selectedCourseAtom'

const useDeleteCourseMutation = (queryId: string) => {
  const [, setIsCourseChecked] = useRecoilState(isCourseCheckedState)
  const [, setSelectedCourse] =
    useRecoilState(selectedCourseState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const queryClient = useQueryClient()
  const { mutate } = useMutation((courseId: string) => deleteCourse(courseId), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setSelectedCourse(defaultCourse)
      setIsCourseChecked(defaultCourseChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleDeleteCourse = (id:string) => {
    mutate(id)
  }
  return {
    handleDeleteCourse
  }
}

export default useDeleteCourseMutation
