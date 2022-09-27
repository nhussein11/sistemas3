
import { atom } from 'recoil'
import { CourseFrontend } from '../../@types/frontend.types'
export const defaultCourse:CourseFrontend = {
  id: '',
  name: '',
  description: '',
  price: 0,
  hoursQuantity: 0
}
export const selectedCourseState = atom({
  key: 'selectedCourseState',
  default: defaultCourse
})
