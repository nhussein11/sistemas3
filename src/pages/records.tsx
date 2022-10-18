import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import { selectedFilterCustomerState } from '../frontend/atoms/records/selectedFilterCustomer'
import { selectedFilterSupplierState } from '../frontend/atoms/records/selectedFilterSupplier'
import RecordsTable from '../frontend/components/records/RecordsTable'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import { filterRecords } from '../frontend/services/records/filterRecords'

const Home: NextPage = () => {
  const query2 = useRecordsQuery('records')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  const [selectedFilterSupplier] = useRecoilState(selectedFilterSupplierState)
  const [selectedFilterCustomer] = useRecoilState(selectedFilterCustomerState)
  let filteredRecords = filterRecords(query2?.data?.records, globalFilterValue)
  const { query } = useRouter()
  if (query.type?.toString() === 'ing') {
    filteredRecords =
    selectedFilterSupplier.id === ''
      ? filterRecords(query2?.data?.records, globalFilterValue)
      : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
        (record) => record.supplierId === selectedFilterSupplier.id
      )
  } else {
    selectedFilterCustomer.id === ''
      ? filterRecords(query2?.data?.records, globalFilterValue)
      : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
        (record) => record.customerId === selectedFilterCustomer.id
      )
  }

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
