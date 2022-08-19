import { atom } from 'recoil'

export const isProductCheckedState = atom({
  key: 'isProductCheckedState',
  default: {
    id: '',
    checked: false
  }
})
