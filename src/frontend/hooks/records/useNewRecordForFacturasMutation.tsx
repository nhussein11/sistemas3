import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { defaultCustomer, selectedCustomerState } from '../../atoms/customers/selectedCustomerAtom'
import { defaultSupplier, selectedSupplierState } from '../../atoms/suppliers/selectedSupplierAtom'
import { defaultRecords, selectedRecordsState } from '../../atoms/records/selectedRecords'
import { defaultRecordType, selectedRecordTypeState } from '../../atoms/records/selectedRecordType'
import { createNewRecordFactura } from '../../services/records/createNewRecordFactura'
import { useRouter } from 'next/router'
import { defaultRecordLetter, selectedRecordLetterState } from '../../atoms/records/selectedRecordLetter'
import { RecordNameEnum } from '@prisma/client'
import { isPostState } from '../../atoms/isPostState'

const useNewRecordForFacturasMutation = (queryId: string, recordObservation: any, recordAdress: any, recordNumber: any, toast: any) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  // Queries
  // hooks
  const [, setPosting] = useRecoilState(isPostState)
  const [selectedRecord, setSelectedRecords] = useRecoilState(selectedRecordsState)
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(selectedCustomerState)
  const [selectedSupplier, setSelectedSupplier] = useRecoilState(selectedSupplierState)
  const [selectedRecordType, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const [selectedRecordLetter, setSelectedRecordLetter] = useRecoilState(selectedRecordLetterState)
  const { mutate } = useMutation(createNewRecordFactura, {
    onSuccess: (data) => {
    // Limpio campos
      queryClient.invalidateQueries([queryId])
      setSelectedRecordType(defaultRecordType)
      setSelectedRecordLetter(defaultRecordLetter)
      setSelectedRecords(defaultRecords)
      setSelectedSupplier(defaultSupplier)
      setSelectedCustomer(defaultCustomer)
      setPosting(false)
      toast.current.show({ severity: 'success', summary: 'Realizado', detail: 'Comprobante Generado', life: 3000 })
      setTimeout(() => {
        switch (selectedRecordType.recordName) {
          case RecordNameEnum.FACTURA_ORIGINAL:
            router.replace('/records?type=egr')
            break
          case RecordNameEnum.FACTURA_DUPLICADO:
          case RecordNameEnum.ORDEN_DE_PAGO:
            router.replace('/records?type=ing')
            break
        }
      }, 2000)
    },
    onError: (error: any) => {
      console.log(error.message)
    }
  })
  const handleCreateNewRecordForFacturas = () => {
    mutate({
      observation: recordObservation.value as string,
      address: recordAdress.value as string,
      letter: selectedRecordLetter,
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
