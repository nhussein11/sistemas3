import { useQuery } from '@tanstack/react-query'
import { getSuppliers } from '../../services/suppliers/getSuppliers'

const useSuppliersQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getSuppliers().then((res) => res.data))
  return query
}

export default useSuppliersQuery
