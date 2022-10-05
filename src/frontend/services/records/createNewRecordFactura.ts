import publicAxiosInstance from '../../api/axios-api'
type RecordData = {
  observation: string,
  address: string,
  letter: string,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  supplierId: string,
  customerId: string,
  details: {
    recordId: string
  }[]
}
export const createNewRecordFactura = async (record: RecordData) => {
  const response = await publicAxiosInstance.post('/previous-record', record)
  return response
}