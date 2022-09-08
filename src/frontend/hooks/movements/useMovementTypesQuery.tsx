import { useQuery } from '@tanstack/react-query'
import { getMovementTypes } from '../../services/movements/getMovementsTypes'

const useMovementTypesQuery = (queryId: string) => {
  const query = useQuery([queryId], () =>
    getMovementTypes().then((res) => res.data)
  )
  return query
}

export default useMovementTypesQuery
