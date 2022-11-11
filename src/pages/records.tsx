import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import { selectedFilterCustomerState } from '../frontend/atoms/records/selectedFilterCustomer'
import { selectedFilterSupplierState } from '../frontend/atoms/records/selectedFilterSupplier'
import RecordsTable from '../frontend/components/records/RecordsTable'
import useRecordsQuery from '../frontend/hooks/records/useRecordsQuery'
import useRecordTypesQuery from '../frontend/hooks/records/useRecordTypesQuery'
import { filterRecords } from '../frontend/services/records/filterRecords'
import { filterTypeRecord } from '../frontend/services/records/filterTypeRecord'

const Home: NextPage = () => {
  const query2 = useRecordsQuery('records')
  const recordTypesQuery = useRecordTypesQuery('record-types')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  const [selectedFilterSupplier] = useRecoilState(selectedFilterSupplierState)
  const [selectedFilterCustomer] = useRecoilState(selectedFilterCustomerState)
  let filteredRecords = filterRecords(query2?.data?.records, globalFilterValue)
  const { query } = useRouter()
  const type = query.type?.toString()

  switch (type) {
    case 'mov':
      filteredRecords = filterTypeRecord(query2?.data?.records, type, recordTypesQuery)
      break
    case 'com':
      filteredRecords = selectedFilterCustomer.id === ''
        ? filterTypeRecord(query2?.data?.records, type, recordTypesQuery)
        : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
          (record) => record.customerId === selectedFilterCustomer.id
        )
      break
    case 'ven':
      filteredRecords =
        selectedFilterSupplier.id === ''
          ? filterTypeRecord(query2?.data?.records, type, recordTypesQuery)
          : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
            (record) => record.supplierId === selectedFilterSupplier.id
          )
      break
    case 'op':
      filteredRecords =
          selectedFilterSupplier.id === ''
            ? filterTypeRecord(query2?.data?.records, type, recordTypesQuery)
            : filterRecords(query2?.data?.records, globalFilterValue)?.filter(
              (record) => record.supplierId === selectedFilterSupplier.id
            )
      break
    default:
      break
  }
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
