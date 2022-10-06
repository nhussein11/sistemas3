import { Supplier } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
export const resolveRecordSupplierName = (
  recordSupplierId: string,
  recordSupplierQuery : UseQueryResult<{ suppliers:Supplier[] }, unknown>
): string | undefined => {
  const supplier = recordSupplierQuery.data?.suppliers?.find(
    (supplier: Supplier) => supplier.id === recordSupplierId
  )
  return supplier?.name
}
