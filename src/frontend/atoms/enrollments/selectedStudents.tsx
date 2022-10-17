import { atom } from 'recoil'
export const defaultSelectedStudents: {
  studentIds: string[]
} = {
  studentIds: []
}
export const selectedStudentsState = atom({
  key: 'selectedStudentsState',
  default: defaultSelectedStudents
})
