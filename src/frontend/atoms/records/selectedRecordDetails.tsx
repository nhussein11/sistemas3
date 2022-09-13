import { atom } from 'recoil'
import { RecordDetailData } from '../../@types/frontend.types'
export const defaultRecordDetails :Array<RecordDetailData> = []

export const selectedRecordDetailsState = atom({
  key: 'selectedRecordDetailsState',
  default: defaultRecordDetails
})
