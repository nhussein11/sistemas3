import { atom } from 'recoil'
export const defaultProduct = {
  stockId: '',
  productId: '',
  storeId: '',
  quantity: 0
}
export const selectedMovProductState = atom({
  key: 'selectedMovProductState',
  default: defaultProduct
})
