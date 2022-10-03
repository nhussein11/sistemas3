import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import SalesTable from '../frontend/components/sales/SalesTable'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import { filterRecords } from '../frontend/services/records/filterRecords'

const Sales: NextPage = () => {
  const query = useRecordsQuery('records')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
    <div>
      <Head>
        <title>Comprobantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <SalesTable
          records={filterRecords(query?.data?.records, globalFilterValue)}
        />
      </div>
    </div>
  )
}

export default Sales
