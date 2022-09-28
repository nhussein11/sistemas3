import { Student } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'

export const findStudentName = (
  id: string,
  studentsQuery: UseQueryResult<{ students: Student[] }, unknown>
) => {
  const student = studentsQuery.data?.students?.find(
    (student: Student) => student.id === id
  )
  return student?.name
}
