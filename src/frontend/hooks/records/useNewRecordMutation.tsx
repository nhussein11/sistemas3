import { useMutation, useQueryClient } from '@tanstack/react-query'
// import useField from '../useField'
import { RecordType, Store, Stock, Customer, Supplier } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { createNewRecord } from '../../services/records/createNewRecord'
import { defaultStore, selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import { defaultCustomer, selectedCustomerState } from '../../atoms/customers/selectedCustomerAtom'
import { defaultSupplier, selectedSupplierState } from '../../atoms/suppliers/selectedSupplierAtom'
import { defaultRecordDetails, selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import useStocksQuery from '../stock/useStocksQuery'
import { ParseRecordDetails } from '../../services/records/parseRecordDetails'
import useProductsQuery from '../products/useProductsQuery'
import useCustomerQuery from '../customers/useCustomersQuery'
import useSupplierQuery from '../suppliers/useSuppliersQuery'
import useRecordsQuery from '../records/useRecordsQuery'
import useRecordTypesQuery from './useRecordTypesQuery'
import useStoresQuery from '../stores/useStoresQuery'
import useDetailsQuery from '../details/useDetailsQuery'

const useNewRecordMutation = (queryId: string, recordObservation: any, recordAdress: any, recordLetter: any, recordNumber: any, recordPaidFor: any) => {
  const queryClient = useQueryClient()
  // Queries
  const recordTypesQuery = useRecordTypesQuery('record-type')
  const storesQuery = useStoresQuery('stores')
  const stocksQuery = useStocksQuery('stock')
  const productsQuery = useProductsQuery('products')
  const customerQuery = useCustomerQuery('customers')
  const supplierQuery = useSupplierQuery('suppliers')
  const recordsQuery = useRecordsQuery('records')
  const detailsQuery = useDetailsQuery('details')
  // hooks
  const [selectedRecordDetails, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(selectedCustomerState)
  const [selectedSupplier, setSelectedSupplier] = useRecoilState(selectedSupplierState)
  const [selectedRecordType, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const changeRecordType = (name: string) => {
    setSelectedRecordType(recordTypesQuery.data?.recordsTypes.find((recordType: RecordType) => recordType.recordName === name))
  }
  const changeStore = (name: string) => {
    setSelectedStore(storesQuery.data?.stores.find((store: Store) => store.name === name))
  }
  const changeSupplier = (name: string) => {
    setSelectedSupplier(supplierQuery.data?.suppliers.find((supplier: Supplier) => supplier.name === name))
  }
  const changeCustomer = (name: string) => {
    setSelectedCustomer(customerQuery.data?.customers.find((customer: Customer) => customer.name === name))
  }

  const { mutate } = useMutation(createNewRecord, {
    onSuccess: (data) => {
    // Limpio campos
      queryClient.invalidateQueries([queryId])
      // recordObservation.onChange('')
      // recordAdress.onChange('')
      // recordLetter.onChange('')
      // recordNumber.onChange('')
      // recordPaidFor.onChange(false)
      setSelectedRecordType(defaultRecordType)
      setSelectedRecordDetails(defaultRecordDetails)
      setSelectedStore(defaultStore)
      setSelectedSupplier(defaultSupplier)
      setSelectedCustomer(defaultCustomer)
    },
    onError: (error: any) => {
      console.log(error.message)
    }
  })
  const handleCreateNewRecord = () => {
    mutate({
      observation: recordObservation.value as string,
      address: recordAdress.value as string,
      letter: recordLetter.value as string,
      recordNumber: recordNumber.value as number,
      paidFor: recordPaidFor.value as boolean,
      recordTypeId: selectedRecordType.id,
      supplierId: selectedSupplier.id,
      customerId: selectedCustomer.id,
      details: ParseRecordDetails(selectedRecordDetails, productsQuery)
    })
  }
  const recordTypesOptions = recordTypesQuery?.data?.recordsTypes.map(
    (recordTypes: RecordType) => recordTypes.recordName
  )
  const storesOptions = storesQuery?.data?.stores.map(
    (store: Store) => store.name
  )
  const stockOptions = stocksQuery?.data?.stocks.filter(
    (stock: Stock) => stock.storeId === selectedStore.id
  )
  const recordsOptions = recordsQuery?.data?.records
  const customerOptions = customerQuery?.data?.customers.map(
    (customer: Customer) => customer.name
  )
  const suppliersOptions = supplierQuery?.data?.suppliers.map(
    (supplier: Supplier) => supplier.name
  )
  return {
    handleCreateNewRecord,
    changeStore,
    changeRecordType,
    changeSupplier,
    changeCustomer,
    selectedRecordType,
    selectedStore,
    selectedCustomer,
    selectedSupplier,
    recordTypesOptions,
    storesOptions,
    stockOptions,
    customerOptions,
    suppliersOptions,
    recordsOptions,
    recordObservation,
    recordAdress,
    recordLetter,
    recordNumber,
    recordPaidFor,
    productsQuery,
    storesQuery,
    customerQuery,
    supplierQuery,
    detailsQuery
  }
}

export default useNewRecordMutation
