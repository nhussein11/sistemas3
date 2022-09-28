import { atom } from 'recoil'
export const defaultStudentChecked = { id: '', checked: false }
export const isStudentCheckedState = atom({
  key: 'isStudentCheckedState',
  default: defaultStudentChecked
})
