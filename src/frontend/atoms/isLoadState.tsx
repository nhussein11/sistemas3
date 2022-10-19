import { atom } from 'recoil'
export const defaultLoad = true
export const isLoadState = atom({
  key: 'isLoadState',
  default: defaultLoad
})
