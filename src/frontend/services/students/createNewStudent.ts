import publicAxiosInstance from '../../api/axios-api'
type StudentData = {
  name: string
  surname: string
  identificationNumber: number
  birth: string
  phone: number
  email: string
}
export const createNewStudent = async (student: StudentData) => {
  const response = await publicAxiosInstance.post('/students', {
    ...student,
    birth: new Date(student.birth)
  })
  return response
}
