import { atom } from 'recoil'
export const defaultTitle = 'COMPROBANTE'
export const titleRecordState = atom({
  key: 'titleRecordState',
  default: defaultTitle
})
