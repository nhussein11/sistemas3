import { Record } from '.prisma/client'

export const ParseRecordDetailsFactura = (records: Record[]) => {
  return records.map((record) => {
    return record.id
  })
}
