import { atom } from 'recoil'
export const defaultMovementChecked = { id: '', checked: false }
export const isSMovementCheckedState = atom({
  key: 'isStoreCheckedState',
  default: defaultMovementChecked
})
