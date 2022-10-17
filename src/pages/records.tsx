import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import { selectedFilterSupplierState } from '../frontend/atoms/records/selectedFilterSupplier'
import RecordsTable from '../frontend/components/records/RecordsTable'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import { filterRecords } from '../frontend/services/records/filterRecords'

const Home: NextPage = () => {
  const query = useRecordsQuery('records')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  const [selectedFilterSupplier] = useRecoilState(selectedFilterSupplierState)
  const filteredRecords =
    selectedFilterSupplier.id === ''
      ? filterRecords(query?.data?.records, globalFilterValue)
      : filterRecords(query?.data?.records, globalFilterValue)?.filter(
        (record) => record.supplierId === selectedFilterSupplier.id
      )
  return (
    <div>
      <Head>
        <title>Comprobantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <RecordsTable records={filteredRecords} />
      </div>
    </div>
  )
}

export default Home
