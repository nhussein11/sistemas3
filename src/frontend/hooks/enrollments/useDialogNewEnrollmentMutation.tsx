import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import {
  defaultCourseChecked,
  isCourseCheckedState
} from '../../atoms/courses/isCourseCheckedAtom'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import {
  defaultStudentChecked,
  isStudentCheckedState
} from '../../atoms/students/isStudentSelected'
import { createNewEnrollment } from '../../services/enrollments/createNewEnrollment'
import useCoursesQuery from '../courses/useCoursesQuery'
import useStudentsQuery from '../students/useStudentsQuery'
import useField from '../useField'

const useDialogNewEnrollmentMutation = (queryId: string) => {
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setErrorState] = useRecoilState(ErrorState)
  const academicYear = useField({ initialValue: 0, type: 'number' })
  const queryClient = useQueryClient()
  const studentsQuery = useStudentsQuery('students')
  const coursesQuery = useCoursesQuery('courses')
  const [isStudentChecked, setIsStudentChecked] = useRecoilState(
    isStudentCheckedState
  )
  const [isCourseChecked, setIsCourseChecked] =
    useRecoilState(isCourseCheckedState)
  const { mutate } = useMutation(createNewEnrollment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      academicYear.onChange(0)
      setIsStudentChecked(defaultStudentChecked)
      setIsCourseChecked(defaultCourseChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleCreateNewEnrollment = () => {
    mutate({
      studentId: isStudentChecked.id,
      courseId: isCourseChecked.id,
      academicYear: academicYear.value as number
    })
  }
  return {
    handleCreateNewEnrollment,
    studentsQuery,
    coursesQuery,
    academicYear
  }
}

export default useDialogNewEnrollmentMutation
