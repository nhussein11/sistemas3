import { atom } from 'recoil'
export const defaultCustomer = {
  id: '',
  name: '',
  debt: 0
}
export const selectedCustomerState = atom({
  key: 'selectedCustomer',
  default: defaultCustomer
})
