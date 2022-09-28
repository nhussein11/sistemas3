import { atom } from 'recoil'
export const defaultEnrollment = {
  id: '',
  courseId: '',
  studentId: '',
  AcademicYear: 0
}
export const selectedEnrollmentState = atom({
  key: 'selectedEnrollmentState',
  default: defaultEnrollment
})
