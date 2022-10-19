import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'
import { getProducts } from '../../services/products/getProducts'

const useProductsQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getProducts().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useProductsQuery
