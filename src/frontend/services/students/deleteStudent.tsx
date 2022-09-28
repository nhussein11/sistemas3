import publicAxiosInstance from '../../api/axios-api'
export const deleteStudent = async (StudentId: string) => {
  const response = await publicAxiosInstance.delete(
    `/students/${StudentId}`,
    {}
  )
  return response
}
