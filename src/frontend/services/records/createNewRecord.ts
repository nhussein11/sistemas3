import publicAxiosInstance from '../../api/axios-api'
type RecordData = {
  observation: string
  recordTypeId: string,
  details: {
    stockId: string
    quantity: number
  }[]
}
export const createNewRecord = async (record: RecordData) => {
  const response = await publicAxiosInstance.post('/records', record)
  return response
}
