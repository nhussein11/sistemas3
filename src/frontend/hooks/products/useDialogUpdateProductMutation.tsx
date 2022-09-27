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
import { defaultCourse, selectedCourseState } from '../../atoms/courses/selectedCourseAtom'
import { defaultCourseChecked, isCourseCheckedState } from '../../atoms/courses/isCourseCheckedAtom'
import { CourseFrontend } from '../../@types/frontend.types'
import { updateCourse } from '../../services/courses/updateCourse'

const useDialogUpdateCourseMutation = (queryId: string) => {
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseState)
  const [showUpdateDialog, setShowUpdateDialog] = useRecoilState(
    showUpdateDialogState
  )
  // eslint-disable-next-line no-unused-vars
  const [, setErrorState] = useRecoilState(ErrorState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [, setIsCourseChecked] = useRecoilState(isCourseCheckedState)
  const courseName = useField({ initialValue: '', type: 'text' })
  const courseDescription = useField({ initialValue: '', type: 'text' })
  const coursePrice = useField({ initialValue: 0, type: 'number' })
  const courseHours = useField({ initialValue: 0, type: 'number' })
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price, description, hoursQuantity }: CourseFrontend) =>
    updateCourse({ id, name, price, description, hoursQuantity })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries([queryId])
      setShowUpdateDialog(showUpdateDialogDefaultState)
      setSelectedCourse(defaultCourse)
      courseName.onChange('')
      courseDescription.onChange('')
      coursePrice.onChange(0)
      setIsCourseChecked(defaultCourseChecked)
      setErrorState(defaultErrorState)
    },
    onError: (error: any) => {
      setErrorState({ status: error.response.status, message: error.message })
      setShowErrorDialog(true)
    }
  })
  const handleUpateCourse = () => {
    mutate({
      id: selectedCourse.id,
      name: courseName.value as string,
      description: courseDescription.value as string,
      hoursQuantity: courseHours.value as number,
      price: coursePrice.value as number
    })
  }
  useEffect(() => {
    courseName.onChange(selectedCourse.name)
    coursePrice.onChange(selectedCourse.price)
    courseDescription.onChange(selectedCourse.description)
    courseHours.onChange(selectedCourse.hoursQuantity)
  }, [selectedCourse])
  return {
    handleUpateCourse,
    courseName,
    coursePrice,
    courseDescription,
    courseHours,
    showUpdateDialog,
    setShowUpdateDialog
  }
}

export default useDialogUpdateCourseMutation
