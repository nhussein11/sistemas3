import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { CoursesFilterValueState } from '../../atoms/courses/filterValueAtom'
import {
  defaultCourseChecked,
  isCourseCheckedState
} from '../../atoms/courses/isCourseCheckedAtom'
import { defaultSelectedStudents, selectedStudentsState } from '../../atoms/enrollments/selectedStudents'
import { defaultErrorState, ErrorState } from '../../atoms/error/ErrorAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { StudentsFilterValueState } from '../../atoms/students/filterValueAtom'
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
  const [selectedStudents, setSelectedStudents] = useRecoilState(
    selectedStudentsState
  )
  const [studentsFilterValue] = useRecoilState(StudentsFilterValueState)
  const [coursesFilterValue] = useRecoilState(CoursesFilterValueState)
  const [isCourseChecked, setIsCourseChecked] =
    useRecoilState(isCourseCheckedState)
  const { mutate } = useMutation(createNewEnrollment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    },
    onSettled: () => {
      setSelectedStudents(defaultSelectedStudents)
      setIsCourseChecked(defaultCourseChecked)
      academicYear.onChange(0)
    }
  })
  const handleCreateNewEnrollment = () => {
    mutate({
      studentIds: selectedStudents.studentIds,
      courseId: isCourseChecked.id,
      academicYear: academicYear.value as number
    })
  }
  return {
    handleCreateNewEnrollment,
    studentsQuery,
    coursesQuery,
    academicYear,
    studentsFilterValue,
    coursesFilterValue
  }
}

export default useDialogNewEnrollmentMutation
