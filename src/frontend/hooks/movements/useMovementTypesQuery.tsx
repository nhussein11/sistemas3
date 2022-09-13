import { useQuery } from '@tanstack/react-query'
import { getRecordTypes } from '../../services/records/getRecordsTypes'

const useRecordTypesQuery = (queryId: string) => {
  const query = useQuery([queryId], () =>
    getRecordTypes().then((res) => res.data)
  )
  return query
}

export default useRecordTypesQuery
