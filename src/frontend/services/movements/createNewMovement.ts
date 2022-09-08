import publicAxiosInstance from '../../api/axios-api'
type MovementData = {
  datetime: Date
  observation: string
  MovementTypeId: string
}
export const createNewMovement = async (movement: MovementData) => {
  const response = await publicAxiosInstance.post('/movements', movement)
  return response
}
