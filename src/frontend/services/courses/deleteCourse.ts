import publicAxiosInstance from '../../api/axios-api'
export const deleteCourse = async (courseId: string) => {
  const response = await publicAxiosInstance.delete(
    `/course/${courseId}`,
    {}
  )
  return response
}
