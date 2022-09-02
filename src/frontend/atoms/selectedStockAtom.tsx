import { atom } from 'recoil'
export const defaultStock = {
  id: '',
  productId: '',
  storeId: '',
  quantity: 0,
  minQuantity: 0
}
export const selectedStockState = atom({
  key: 'selectedStockState',
  default: defaultStock
})
