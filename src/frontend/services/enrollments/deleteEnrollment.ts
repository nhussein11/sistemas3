import publicAxiosInstance from '../../api/axios-api'
export const deleteEnrollment = async (enrollmentId: string) => {
  const response = await publicAxiosInstance.delete(
    `/enrollments/${enrollmentId}`,
    {}
  )
  return response
}
