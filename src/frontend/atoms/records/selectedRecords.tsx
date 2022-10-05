import { atom } from 'recoil'
export const defaultRecords :Array<String> = []

export const selectedRecordsState = atom({
  key: 'selectedRecordsState',
  default: defaultRecords
})
