import { atom } from 'recoil'
export const defaultProductChecked = { id: '', checked: false }
export const isProductCheckedState = atom({
  key: 'isProductCheckedState',
  default: defaultProductChecked
})
