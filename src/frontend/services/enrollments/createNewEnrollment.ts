import publicAxiosInstance from '../../api/axios-api'
type EnrollmentData = {
  courseId: string
  studentId: string
  academicYear: number
}
export const createNewEnrollment = async (enrollment: EnrollmentData) => {
  const response = await publicAxiosInstance.post('/enrollments', enrollment)
  return response
}