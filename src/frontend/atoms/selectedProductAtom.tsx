import { atom } from 'recoil'

export const selectedProductState = atom({
  key: 'selectedProductState',
  default: {
    id: '',
    name: '',
    price: 0
  }
})
