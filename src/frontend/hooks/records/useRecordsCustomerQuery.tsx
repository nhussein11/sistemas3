import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../../services/customers/getCustomers'

const useRecordsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getCustomers().then((res) => res.data))
  return query
}

export default useRecordsQuery
