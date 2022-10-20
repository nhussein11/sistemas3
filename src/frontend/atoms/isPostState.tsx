import { atom } from 'recoil'
export const defaultLoad = false
export const isPostState = atom({
  key: 'isPostState',
  default: defaultLoad
})
