import { useQuery } from '@tanstack/react-query'
import { getStores } from '../../services/stores/getStores'
const useStoresQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getStores().then((res) => res.data))
  return query
}

export default useStoresQuery
