import { Store } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'

export const findStore = (
  id: string,
  storesQuery: UseQueryResult<{ stores: Store[] }, unknown>
) => {
  const store = storesQuery.data?.stores?.find(
    (store: Store) => store.id === id
  )
  return store?.name
}
