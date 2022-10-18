import { atom } from 'recoil'
export const defaultCustomer = {
  id: '',
  name: ''
}
export const selectedFilterCustomerState = atom({
  key: 'selectedFilterCustomerState',
  default: defaultCustomer
})
