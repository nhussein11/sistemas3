import { useMutation, useQueryClient } from '@tanstack/react-query'
// import useField from '../useField'
import { useRecoilState } from 'recoil'
import { defaultCustomer, selectedCustomerState } from '../../atoms/customers/selectedCustomerAtom'
import { defaultSupplier, selectedSupplierState } from '../../atoms/suppliers/selectedSupplierAtom'
import { defaultRecords, selectedRecordsState } from '../../atoms/records/selectedRecords'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import { createNewRecordFactura } from '../../services/records/createNewRecordFactura'

const useNewRecordForFacturasMutation = (queryId: string, recordObservation: any, recordAdress: any, recordLetter: any, recordNumber: any, recordPaidFor: any) => {
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
      setSelectedRecordType(defaultRecordType)
      setSelectedRecords(defaultRecords)
      setSelectedSupplier(defaultSupplier)
      setSelectedCustomer(defaultCustomer)
    },
    onError: (error: any) => {
      console.log(error.message)
    }
  })
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
      paidForRecordIds: selectedRecord.map((element) => element.recordId)
    })
  }
  return {
    handleCreateNewRecordForFacturas
  }
}

export default useNewRecordForFacturasMutation
