import { atom } from 'recoil'
export const defaultRecordType = {
  id: 'cl8yuh53800825bpherclkqcq',
  recordType: 'NEGATIVE',
  recordName: 'FACTURA_DUPLICADO',
  cause: 'Factura Duplicado'
}

export const selectedRecordTypeState = atom({
  key: 'selectedRecordType',
  default: defaultRecordType
})
