import { atom } from 'recoil'
export const defaultProduct = {
  id: '',
  name: '',
  price: 0
}
export const selectedProductState = atom({
  key: 'selectedProductState',
  default: defaultProduct
})
