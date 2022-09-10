import { atom } from 'recoil'
export const defaultStoreChecked = { id: '', checked: false }
export const isStoreCheckedState = atom({
  key: 'isStoreCheckedState',
  default: defaultStoreChecked
})
