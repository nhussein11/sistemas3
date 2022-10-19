import { useQuery } from '@tanstack/react-query'
import { getStores } from '../../services/stores/getStores'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useStoresQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getStores().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useStoresQuery
