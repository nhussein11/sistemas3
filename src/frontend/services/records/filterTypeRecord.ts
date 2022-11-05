import { Record, RecordNameEnum } from '@prisma/client'
import { resolveRecordName } from './resolveRecordName'

export const filterTypeRecord = (records: Record[], type: string, recordTypesQuery: any) => {
  switch (type) {
    case 'mov':
      return records?.filter((record) => {
        return resolveRecordName(record.recordTypeId, recordTypesQuery) === (RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO) || resolveRecordName(record.recordTypeId, recordTypesQuery) === (RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO)
      })
    case 'ven':
      return records?.filter((record) => {
        return resolveRecordName(record.recordTypeId, recordTypesQuery) === (RecordNameEnum.FACTURA_DUPLICADO)
      })
    case 'com':
      return records?.filter((record) => {
        return resolveRecordName(record.recordTypeId, recordTypesQuery) === (RecordNameEnum.FACTURA_ORIGINAL)
      })
    case 'op':
      return records?.filter((record) => {
        return resolveRecordName(record.recordTypeId, recordTypesQuery) === (RecordNameEnum.ORDEN_DE_PAGO)
      })
    default:
      return records
  }
}
