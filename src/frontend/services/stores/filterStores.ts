import { Store } from '../../../shared/schemas/store.type'

export const filterStores = (stores: Store[], search: string) => {
  return stores?.filter((store) => {
    return store.name.toLowerCase().includes(search.toLowerCase())
  })
}
