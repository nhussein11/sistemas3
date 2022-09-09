import { useQuery } from '@tanstack/react-query'
import { getDetails } from '../../services/details/getDetails'
const useDetailsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getDetails().then((res) => res.data))
  return query
}

export default useDetailsQuery
