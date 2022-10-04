import { useQuery } from '@tanstack/react-query'
import { getSuppliers } from '../../services/suppliers/getSuppliers'

const useRecordsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getSuppliers().then((res) => res.data))
  return query
}

export default useRecordsQuery
