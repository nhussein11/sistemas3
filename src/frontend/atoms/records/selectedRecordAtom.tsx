import { atom } from 'recoil'
export const defaultRecord = {
  id: '',
  datetime: new Date(),
  observation: '',
  recordTypeId: ''
}
export const selectedRecordState = atom({
  key: 'selectedRecordState',
  default: defaultRecord
})
