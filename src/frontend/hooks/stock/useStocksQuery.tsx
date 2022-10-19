import { useQuery } from '@tanstack/react-query'
import { getStocks } from '../../services/stock/getStocks'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useStocksQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getStocks().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useStocksQuery
