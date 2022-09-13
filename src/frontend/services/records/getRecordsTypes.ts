import publicAxiosInstance from '../../api/axios-api'
export const getRecordTypes = async () => {
  const response = await publicAxiosInstance.get('/record-type')
  return response
}
