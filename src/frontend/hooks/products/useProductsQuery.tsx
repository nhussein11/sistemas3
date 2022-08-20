import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/getProducts'

const useProductsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getProducts().then((res) => res.data))
  return query
}

export default useProductsQuery
