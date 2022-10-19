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
import { filterTypeRecord } from '../frontend/services/records/filterTypeRecord'

const Home: NextPage = () => {
  const query2 = useRecordsQuery('records')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  const [selectedFilterSupplier] = useRecoilState(selectedFilterSupplierState)
  const [selectedFilterCustomer] = useRecoilState(selectedFilterCustomerState)
  let filteredRecords = filterRecords(query2?.data?.records, globalFilterValue)
  console.log('RECORDS', filteredRecords)
  const { query } = useRouter()
  const type = query.type?.toString()
  if (type === 'ing') {
    filteredRecords = selectedFilterCustomer.id === ''
      ? filterTypeRecord(query2?.data?.records, type)
      : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
        (record) => record.customerId === selectedFilterCustomer.id
      )
  } else {
    filteredRecords =
    selectedFilterSupplier.id === ''
      ? filterTypeRecord(query2?.data?.records, 'egr')
      : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
        (record) => record.supplierId === selectedFilterSupplier.id
      )
  }
  console.log('RECORDS', filteredRecords)

  return (
    <div>
      <Head>
        <title>Comprobantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <RecordsTable records={filteredRecords} type={type} />
      </div>
    </div>
  )
}

export default Home
