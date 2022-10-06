import { Customer } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
export const resolveRecordCustomerName = (
  recordCustomerId: string,
  recordCustomerQuery : UseQueryResult<{ customers:Customer[] }, unknown>
): string | undefined => {
  const customer = recordCustomerQuery.data?.customers?.find(
    (customer: Customer) => customer.id === recordCustomerId
  )
  return customer?.name
}
