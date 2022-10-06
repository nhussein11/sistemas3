import { atom } from 'recoil'
export const defaultRecordType = {
  id: '',
  recordType: '',
  recordName: '',
  cause: ''
}
export const selectedRecordTypeState = atom({
  key: 'selectedRecordType',
  default: defaultRecordType
})
