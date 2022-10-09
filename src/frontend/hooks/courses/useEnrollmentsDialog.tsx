import { useRecoilState } from 'recoil'
import { selectedCourseState } from '../../atoms/courses/selectedCourseAtom'
import { showEnrollmentsDialogState } from '../../atoms/courses/showEnrollmentsDialog'
import { filterEnrollmentsByCourse } from '../../services/courses/filterEnrollmentsByCourse'
import useEnrollmentsQuery from '../enrollments/useEnrollmentsQuery'

const useEnrollmentsDialog = () => {
  const [showEnrollmentsDialog, setShowEnrollmentsDialog] =
    useRecoilState<boolean>(showEnrollmentsDialogState)
  const enrollmentsQuery = useEnrollmentsQuery('enrollments')
  const [selectedCourse] = useRecoilState(selectedCourseState)
  const filteredEnrollments = filterEnrollmentsByCourse(
    enrollmentsQuery,
    selectedCourse.id
  )
  const closeDialog = () => setShowEnrollmentsDialog(false)
  return { filteredEnrollments, showDialog: showEnrollmentsDialog, closeDialog }
}

export default useEnrollmentsDialog
