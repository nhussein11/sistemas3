import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import { selectedFilterSupplierState } from '../frontend/atoms/records/selectedFilterSupplier'
import RecordsTable from '../frontend/components/records/RecordsTable'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import { filterRecords } from '../frontend/services/records/filterRecords'

const Home: NextPage = () => {
  const query2 = useRecordsQuery('records')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  const [selectedFilterSupplier] = useRecoilState(selectedFilterSupplierState)
  const filteredRecords =
    selectedFilterSupplier.id === ''
      ? filterRecords(query2?.data?.records, globalFilterValue)
      : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
        (record) => record.supplierId === selectedFilterSupplier.id
      )
  const { query } = useRouter()
  return (
    <div>
      <Head>
        <title>Comprobantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <RecordsTable records={filteredRecords} type={query.type?.toString()} />
      </div>
    </div>
  )
}

export default Home
