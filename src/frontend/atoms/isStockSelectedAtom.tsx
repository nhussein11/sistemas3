import { atom } from 'recoil'
export const defaultStockChecked = { id: '', checked: false }
export const isStockCheckedState = atom({
  key: 'isStockCheckedState',
  default: defaultStockChecked
})
