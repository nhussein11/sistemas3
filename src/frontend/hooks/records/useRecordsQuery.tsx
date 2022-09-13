import { useQuery } from '@tanstack/react-query'
import { getRecords } from '../../services/records/getRecords'

const useRecordsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getRecords().then((res) => res.data))
  return query
}

export default useRecordsQuery
