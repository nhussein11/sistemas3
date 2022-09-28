import { atom } from 'recoil'
export const defaultEnrollmentChecked = { id: '', checked: false }
export const isEnrollmentCheckedState = atom({
  key: 'isEnrollmentCheckedState',
  default: defaultEnrollmentChecked
})
