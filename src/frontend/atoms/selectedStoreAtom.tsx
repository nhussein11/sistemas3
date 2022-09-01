import { atom } from 'recoil'
export const defaultStore = {
  id: '',
  name: '',
  address: ''
}
export const selectedStoreState = atom({
  key: 'selectedStore',
  default: defaultStore
})
