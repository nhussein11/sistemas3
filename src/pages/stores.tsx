import { NextPage } from 'next'
import React from 'react'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import StoresTable from '../frontend/components/store/StoresTable'
import useStoresQuery from '../frontend/hooks/stores/useStoresQuery'
import { filterStores } from '../frontend/services/stores/filterStores'
const Stores: NextPage = () => {
  const query = useStoresQuery('stores')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
    <StoresTable stores={filterStores(query.data?.stores, globalFilterValue)} />
  )
}

export default Stores
