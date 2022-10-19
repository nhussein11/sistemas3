import { Record, RecordNameEnum } from '@prisma/client'
import { resolveRecordName } from './resolveRecordName'

export const filterTypeRecord = (records: Record[], type: string, recordTypesQuery: any) => {
  if (type === 'ing') {
    return records?.filter((record) => {
      return resolveRecordName(record.recordTypeId, recordTypesQuery)?.includes(RecordNameEnum.FACTURA_DUPLICADO) || resolveRecordName(record.recordTypeId, recordTypesQuery)?.includes(RecordNameEnum.ORDEN_DE_COMPRA)
    })
  } else {
    return records?.filter((record) => {
      return resolveRecordName(record.recordTypeId, recordTypesQuery)?.includes(RecordNameEnum.FACTURA_ORIGINAL) || resolveRecordName(record.recordTypeId, recordTypesQuery)?.includes(RecordNameEnum.ORDEN_DE_PAGO)
    })
  }
}
