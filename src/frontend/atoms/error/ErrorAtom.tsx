import { atom } from 'recoil'
export const defaultErrorState = {
  message: 'Id not provided',
  status: 200
}
export const ErrorState = atom({
  key: 'ErrorState',
  default: defaultErrorState
})
