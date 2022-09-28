import { Student } from '@prisma/client'

export const filterStudents = (students: Student[], search: string) => {
  return students?.filter((student) => {
    return student.identificationNumber.toString().includes(search)
  })
}
