import { Student } from '@prisma/client'
import { atom } from 'recoil'
export const defaultStudent: Student = {
  id: '',
  name: '',
  surname: '',
  identificationNumber: 0,
  birth: new Date(),
  phone: 0,
  email: '',
  customerId: ''
}
export const selectedStudentState = atom({
  key: 'selectedStudentState',
  default: defaultStudent
})
