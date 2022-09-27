import { atom } from 'recoil'
export const defaultCourseChecked = { id: '', checked: false }
export const isCourseCheckedState = atom({
  key: 'isCourseCheckedState',
  default: defaultCourseChecked
})
