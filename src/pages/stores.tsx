import { NextPage } from 'next'
import React from 'react'
import StoresTable from '../frontend/components/store/StoresTable'

const storesDummyData = [
  {
    id: 1,
    name: 'Store 1',
    address: 'Store 1 address'
  },
  {
    id: 2,
    name: 'Store 2',
    address: 'Store 2 address'
  }
]
const Stores: NextPage = () => {
  return <StoresTable stores={storesDummyData}/>
}

export default Stores
