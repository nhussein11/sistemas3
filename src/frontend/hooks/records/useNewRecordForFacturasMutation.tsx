import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultCustomer, selectedCustomerState } from '../../atoms/customers/selectedCustomerAtom'
import { defaultSupplier, selectedSupplierState } from '../../atoms/suppliers/selectedSupplierAtom'
import { defaultRecords, selectedRecordsState } from '../../atoms/records/selectedRecords'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import { createNewRecordFactura } from '../../services/records/createNewRecordFactura'
import { useRouter } from 'next/router'

const useNewRecordForFacturasMutation = (queryId: string, recordObservation: any, recordAdress: any, recordLetter: any, recordNumber: any, toast: any) => {
  const queryClient = useQueryClient()
  const router = useRouter()
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
      toast.current.show({ severity: 'success', summary: 'Realizado', detail: 'Comprobante Generado', life: 3000 })
      router.push('/records')
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
      paidFor: false,
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
