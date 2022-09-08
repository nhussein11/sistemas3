import { useQuery } from '@tanstack/react-query'
import { getMovements } from '../../services/movements/getMovements'

const useMovementsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getMovements().then((res) => res.data))
  return query
}

export default useMovementsQuery
