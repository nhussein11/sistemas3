import { useMutation, useQueryClient } from '@tanstack/react-query'
import useField from '../useField'
import { useRecoilState } from 'recoil'
import { defaultCustomer, selectedCustomerState } from '../../atoms/customers/selectedCustomerAtom'
import { defaultSupplier, selectedSupplierState } from '../../atoms/suppliers/selectedSupplierAtom'
import { defaultRecords, selectedRecordsState } from '../../atoms/records/selectedRecords'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import { createNewRecordFactura } from '../../services/records/createNewRecordFactura'

const useNewRecordForFacturasMutation = (queryId: string) => {
  const queryClient = useQueryClient()
  // Queries
  // hooks
  const [selectedRecord, setSelectedRecords] = useRecoilState(selectedRecordsState)
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(selectedCustomerState)
  const [selectedSupplier, setSelectedSupplier] = useRecoilState(selectedSupplierState)
  const [selectedRecordType, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const { mutate } = useMutation(createNewRecordFactura, {
    onSuccess: (data) => {
    // Limpio campos
      queryClient.invalidateQueries([queryId])
      recordObservation.onChange('')
      recordAdress.onChange('')
      recordLetter.onChange('')
      recordNumber.onChange('')
      recordPaidFor.onChange(false)
      setSelectedRecordType(defaultRecordType)
      setSelectedRecords(defaultRecords)
      //   setSelectedStore(defaultStore)
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
  const recordPaidFor = useField({ initialValue: true, type: 'boolean' })
  const handleCreateNewRecordForFacturas = () => {
    mutate({
      observation: recordObservation.value as string,
      address: recordAdress.value as string,
      letter: recordLetter.value as string,
      recordNumber: recordNumber.value as number,
      paidFor: recordPaidFor.value as boolean,
      recordTypeId: selectedRecordType.id,
      supplierId: selectedSupplier.id,
      customerId: selectedCustomer.id,
      paidForRecordIds: selectedRecord.map((element) => element)
    })
  }
  return {
    handleCreateNewRecordForFacturas
  }
}

export default useNewRecordForFacturasMutation
