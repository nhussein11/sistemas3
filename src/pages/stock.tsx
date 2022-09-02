import { NextPage } from 'next'
import React from 'react'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import StockTable from '../frontend/components/stock/StockTable'
import useStocksQuery from '../frontend/hooks/stock/useStocksQuery'
import { filterStocks } from '../frontend/services/stock/filterStocks'
const Stock: NextPage = () => {
  const query = useStocksQuery('stocks')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
    <StockTable
      stocks={filterStocks(
        query?.data?.stocks,
        Number(globalFilterValue).valueOf()
      )}
    />
  )
}

export default Stock