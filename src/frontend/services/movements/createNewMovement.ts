import publicAxiosInstance from '../../api/axios-api'
type MovementData = {
  datetime: Date
  observation: string
  MovementTypeId: string
  details: {
    productId: string
    quantity: number
  }[]
}
export const createNewMovement = async (movement: MovementData) => {
  console.log(movement)
  const response = await publicAxiosInstance.post('/movements', movement)
  return response
}
