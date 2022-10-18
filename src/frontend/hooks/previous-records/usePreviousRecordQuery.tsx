import { useQuery } from '@tanstack/react-query'
import { getPreviousRecord } from '../../services/previous-records/getPreviousRecord'

const usePreviousRecordsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getPreviousRecord().then((res) => res.data))
  return query
}

export default usePreviousRecordsQuery
