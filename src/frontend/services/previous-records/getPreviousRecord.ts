import publicAxiosInstance from '../../api/axios-api'

export const getPreviousRecord = async () => {
  const response = await publicAxiosInstance.get('/previous-record')
  return response
}
