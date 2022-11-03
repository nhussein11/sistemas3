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
    stockId: string
    productId: string
    quantity: number
    subtotal: number
    historicalPrice: number
  }[]
}
export const createNewRecord = async (record: RecordData) => {
  const response = await publicAxiosInstance.post('/records', record)
  return response
}
