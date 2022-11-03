import publicAxiosInstance from '../../api/axios-api'
type RecordData = {
  recordTypeId: string,
  quantity: number,
  storeId: string,
  productId: string
}
export const createNewRecordMovement = async (record: RecordData) => {
  const response = await publicAxiosInstance.post('/stock-movements', record)
  return response
}
