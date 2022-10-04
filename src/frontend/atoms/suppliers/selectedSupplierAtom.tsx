import { atom } from 'recoil'
export const defaultSupplier = {
  id: '',
  name: '',
  debt: 0
}
export const selectedSupplierState = atom({
  key: 'selectedSupplier',
  default: defaultSupplier
})
