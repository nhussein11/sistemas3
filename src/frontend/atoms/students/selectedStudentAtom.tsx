import { Student } from '@prisma/client'
import { atom } from 'recoil'
export const defaultStudent:Student = {
  id: '',
  name: '',
  surname: '',
  identificationNumber: 0
}
export const selectedStudentState = atom({
  key: 'selectedStudentState',
  default: defaultStudent
})
