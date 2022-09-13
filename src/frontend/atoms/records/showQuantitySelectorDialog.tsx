import { atom } from 'recoil'
export const showQuantitySelectorDialogDefaultState = {
  show: false,
  stockId: '',
  productId: '',
  storeId: ''
}
export const showQuantitySelectorDialogState = atom({
  key: 'showQuantitySelectorDialogState',
  default: showQuantitySelectorDialogDefaultState
})
