import publicAxiosInstance from '../../api/axios-api'
type StudentData = {
  name: string
  surname: string
  identificationNumber: number
}
export const createNewStudent = async (student: StudentData) => {
  console.log(student)
  const response = await publicAxiosInstance.post('/students', student)
  return response
}
