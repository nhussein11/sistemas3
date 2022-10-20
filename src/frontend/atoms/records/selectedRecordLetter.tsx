import { atom } from 'recoil'
export const defaultRecordLetter = 'A'

export const selectedRecordLetterState = atom({
  key: 'selectedRecordLetter',
  default: defaultRecordLetter
})
