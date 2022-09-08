import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import MovementsTable from '../frontend/components/movements/MovementsTable'
import useProductsQuery from '../frontend/hooks/products/useProductsQuery'
import { filterMovements } from '../frontend/services/movements/filterMovements'

const Home: NextPage = () => {
  const query = useProductsQuery('products')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
      <div>
        <Head>
          <title>Movimientos</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="main-container">
          <MovementsTable
            movements={filterMovements(query?.data?.movements, globalFilterValue)}
          />
        </div>
      </div>
  )
}

export default Home
