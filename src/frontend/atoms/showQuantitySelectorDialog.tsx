import { atom } from 'recoil'
export const showQuantitySelectorDialogDefaultState = {
  show: false,
  productId: '',
  name: '',
  price: 0
}
export const showQuantitySelectorDialogState = atom({
  key: 'showQuantitySelectorDialogState',
  default: showQuantitySelectorDialogDefaultState
})
