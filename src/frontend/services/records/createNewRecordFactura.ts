import publicAxiosInstance from '../../api/axios-api'
type RecordData = {
  observation: string,
  address: string,
  letter: string,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  supplierId: string | null,
  customerId: string | null,
  paidForRecordIds: {}[]
}
export const createNewRecordFactura = async (record: RecordData) => {
  if (record.customerId === '') record.customerId = null
  if (record.supplierId === '') record.supplierId = null
  const response = await publicAxiosInstance.post('/previous-record', record)
  return response
}
