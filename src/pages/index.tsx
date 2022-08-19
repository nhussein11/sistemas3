import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../frontend/components/NavBar'
import Summary from '../frontend/components/Summary'
import Table from '../frontend/components/Table'
import useProductsQuery from '../frontend/hooks/useProductsQuery'

const Home: NextPage = () => {
  const query = useProductsQuery('products')
  return (
    <div>
      <Head>
        <title>Sistemas III</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="main-container">
        <Summary />
        <Table products={query?.data?.products} />
      </div>
    </div>
  )
}

export default Home
