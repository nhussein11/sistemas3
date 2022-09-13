import { atom } from 'recoil'
export const defaultRecordChecked = { id: '', checked: false }
export const isSRecordCheckedState = atom({
  key: 'isStoreCheckedState',
  default: defaultRecordChecked
})
