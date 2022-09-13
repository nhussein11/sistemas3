import { RecordType } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
export const resolveRecordType = (
  recordTypeId: string,
  recordTypesQuery: UseQueryResult<
    { recordsTypes: RecordType[] },
    unknown
  >
): string | undefined => {
  const recordType = recordTypesQuery.data?.recordsTypes?.find(
    (recordType: RecordType) => recordType.id === recordTypeId
  )
  return recordType?.recordType
}
