import { useQuery } from '@tanstack/react-query'
import { getStocks } from '../../services/stock/getStocks'

const useStocksQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getStocks().then((res) => res.data))
  return query
}

export default useStocksQuery
