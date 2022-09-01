import { NextPage } from 'next'
import React from 'react'
import StockTable from '../frontend/components/stock/StockTable'

const stocksDummyData = [
  {
    id: 1,
    productId: 1,
    storeId: 1,
    quantity: 10,
    minQuantity: 5
  },
  {
    id: 2,
    productId: 2,
    storeId: 2,
    quantity: 10,
    minQuantity: 5
  }
]

const Stock: NextPage = () => {
  return <StockTable stocks={stocksDummyData}/>
}

export default Stock
