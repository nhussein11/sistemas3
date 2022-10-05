import { atom } from 'recoil'
import { RecordsDetailData } from '../../@types/frontend.types'
export const defaultRecords :Array<RecordsDetailData> = []

export const selectedRecordsState = atom({
  key: 'selectedRecordsState',
  default: defaultRecords
})
