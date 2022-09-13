import publicAxiosInstance from '../../api/axios-api'
type RecordData = {
  observation: string
  recordTypeId: string,
  storeId: string,
  details: {
    productId: string
    quantity: number
  }[]
}
export const createNewRecord = async (record: RecordData) => {
  console.log(record)
  const response = await publicAxiosInstance.post('/records', record)
  return response
}
