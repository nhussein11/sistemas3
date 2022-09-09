import publicAxiosInstance from '../../api/axios-api'
export const getMovementTypes = async () => {
  const response = await publicAxiosInstance.get('/movement-type')
  return response
}
