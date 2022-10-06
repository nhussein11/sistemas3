import { atom } from 'recoil'
export const defaultRecords :Array<
{
  recordId: string,
  recordNumber: number,
  observation: string,
  letter: string,
  supplierId: string,
  customerId: string
}
> = []

export const selectedRecordsState = atom({
  key: 'selectedRecordsState',
  default: defaultRecords
})
