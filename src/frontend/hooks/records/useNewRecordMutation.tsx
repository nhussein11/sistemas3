import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { RecordType, Store, Stock, Customer, Supplier } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { createNewRecord } from '../../services/records/createNewRecord'
import useRecordTypesQuery from './useRecordTypesQuery'
import useStoresQuery from '../stores/useStoresQuery'
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

const useDialogNewRecordMutation = (queryId: string) => {
  const queryClient = useQueryClient()
  // Queries
  const recordTypesQuery = useRecordTypesQuery('record-types')
  const storesQuery = useStoresQuery('stores')
  const stocksQuery = useStocksQuery('stocks')
  const productsQuery = useProductsQuery('products')
  const customerQuery = useCustomerQuery('customers')
  const supplierQuery = useSupplierQuery('suppliers')
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
      recordObservation.onChange('')
      recordAdress.onChange('')
      recordLetter.onChange('')
      recordNumber.onChange('')
      recordPaidFor.onChange(false)
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
  const recordObservation = useField({ initialValue: '', type: 'text' })
  const recordAdress = useField({ initialValue: '', type: 'text' })
  const recordLetter = useField({ initialValue: '', type: 'text' })
  const recordNumber = useField({ initialValue: '', type: 'number' })
  const recordPaidFor = useField({ initialValue: '', type: 'boolean' })

  const handleCreateNewRecord = () => {
    mutate({
      observation: recordObservation.value as string,
      address: recordAdress.value as string,
      letter: recordLetter.value as string,
      recordNumber: recordNumber.value as number,
      recordPaidFor: recordPaidFor.value as boolean,
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
  const customerOptions = customerQuery?.data?.customers.filter(
    (customer: Customer) => customer.id === selectedCustomer.id
  )
  const suppliersOptions = supplierQuery?.data?.suppliers.filter(
    (supplier: Supplier) => supplier.id === selectedSupplier.id
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
    recordObservation,
    recordAdress,
    recordLetter,
    recordNumber,
    recordPaidFor
  }
}

export default useDialogNewRecordMutation
