import { atom } from 'recoil'
export const defaultSupplier = {
  id: '',
  name: ''
}
export const selectedFilterSupplierState = atom({
  key: 'selectedFilterSupplierState',
  default: defaultSupplier
})
