import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RecordType, Store, Customer, Supplier, RecordNameEnum, Record, Stock } from '@prisma/client'
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
import { useRouter } from 'next/router'
import { selectedRecordLetterState } from '../../atoms/records/selectedRecordLetter'
import { isPostState } from '../../atoms/isPostState'
import { titleRecordState } from '../../atoms/titleRecords'
import { findStoreName } from '../../services/stores/findStoreName'
// import { findStoreName } from '../../services/stores/findStoreName'

const useNewRecordMutation = (queryId: string, recordObservation: any, recordAdress: any, recordNumber: any, toast: any) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const recordTypesQuery = useRecordTypesQuery('record-type')
  const storesQuery = useStoresQuery('stores')
  const stocksQuery = useStocksQuery('stock')
  const productsQuery = useProductsQuery('products')
  const customerQuery = useCustomerQuery('customers')
  const supplierQuery = useSupplierQuery('suppliers')
  const recordsQuery = useRecordsQuery('records')
  const detailsQuery = useDetailsQuery('details')
  // hooks
  const [, setPosting] = useRecoilState(isPostState)
  const [selectedRecordDetails, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState)
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(selectedCustomerState)
  const [selectedSupplier, setSelectedSupplier] = useRecoilState(selectedSupplierState)
  const [selectedRecordType, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const [selectedRecordLetter, setSelectedRecordLetter] = useRecoilState(selectedRecordLetterState)
  const [, setTitle] = useRecoilState(titleRecordState)
  const changeRecordType = (name: string) => {
    switch (name) {
      case RecordNameEnum.FACTURA_ORIGINAL:
        setTitle('COMPRA')
        break
      case RecordNameEnum.FACTURA_DUPLICADO:
        setTitle('VENTA')
        break
      case RecordNameEnum.ORDEN_DE_PAGO:
        setTitle('ORDEN PAGO')
        break
    }
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
  const changeLetter = (name: string) => {
    setSelectedRecordLetter(name)
  }

  const { mutate } = useMutation(createNewRecord, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryId])
      setSelectedRecordType(defaultRecordType)
      setSelectedRecordDetails(defaultRecordDetails)
      setSelectedStore(defaultStore)
      setSelectedSupplier(defaultSupplier)
      setSelectedCustomer(defaultCustomer)
      setPosting(false)
      toast.current.show({ severity: 'success', summary: 'Realizado', detail: 'Comprobante Generado. Redirigiendo...', life: 3000 })
      setTimeout(() => {
        switch (selectedRecordType?.recordName) {
          case RecordNameEnum.FACTURA_ORIGINAL:
            router.replace('/records?type=com')
            break
          case RecordNameEnum.FACTURA_DUPLICADO:
            router.replace('/records?type=ven')
            break
          case RecordNameEnum.ORDEN_DE_PAGO:
            router.replace('/records?type=op')
            break
        }
      }, 2000)
    },
    onError: (error: any) => {
      console.log(error.message)
    }
  })
  const handleCreateNewRecord = () => {
    mutate({
      observation: recordObservation.value as string,
      address: recordAdress.value as string,
      letter: selectedRecordLetter,
      recordNumber: recordNumber.value as number,
      paidFor: false,
      recordTypeId: selectedRecordType.id,
      supplierId: (selectedSupplier?.id ? selectedSupplier?.id : ''),
      customerId: (selectedCustomer?.id ? selectedCustomer?.id : ''), // atadisimo con alambre
      details: ParseRecordDetails(selectedRecordDetails, productsQuery)
    })
  }
  const recordTypesOptions = recordTypesQuery?.data?.recordsTypes.map(
    (recordTypes: RecordType) => recordTypes.recordName
  )
  const storesOptions = storesQuery?.data?.stores.map(
    (store: Store) => store.name
  )

  let stockOptions = stocksQuery?.data?.stocks
  switch (selectedRecordType?.recordName) {
    case RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO:
    case RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO:
      stockOptions = stocksQuery?.data?.stocks.filter((stock: Stock) => { return findStoreName(stock.storeId, storesQuery) === selectedStore.name })
  }

  let recordsOptions = recordsQuery?.data?.records
  switch (selectedRecordType?.recordName) {
    case RecordNameEnum.ORDEN_DE_PAGO:
      recordsOptions = recordsQuery?.data?.records.filter((record: Record) => {
        return record.supplierId === selectedSupplier.id
      })
      break
    case RecordNameEnum.ORDEN_DE_COMPRA:
      recordsOptions = recordsQuery?.data?.records.filter((record: Record) => {
        return record.customerId === selectedCustomer.id
      })
      break
  }

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
    changeLetter,
    selectedRecordType,
    selectedStore,
    selectedCustomer,
    selectedSupplier,
    selectedRecordLetter,
    recordTypesOptions,
    storesOptions,
    stockOptions,
    customerOptions,
    suppliersOptions,
    recordsOptions,
    recordObservation,
    recordAdress,
    recordNumber,
    productsQuery,
    storesQuery,
    customerQuery,
    supplierQuery,
    detailsQuery
  }
}

export default useNewRecordMutation
