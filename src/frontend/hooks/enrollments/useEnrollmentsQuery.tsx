import { useQuery } from '@tanstack/react-query'
import { getEnrollments } from '../../services/enrollments/getEnrollments'

const useEnrollmentsQuery = (queryId: string) => {
  const query = useQuery([queryId], () =>
    getEnrollments().then((res) => res.data)
  )
  return query
}

export default useEnrollmentsQuery
