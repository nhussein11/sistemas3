import { RecordDetailData } from '../../@types/frontend.types'

export const ParseRecordDetails = (records: RecordDetailData[]) => {
  return records.map((record: RecordDetailData) => {
    return {
      productId: record.productId,
      quantity: record.quantity
    }
  })
}
