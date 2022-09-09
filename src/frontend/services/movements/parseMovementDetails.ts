import { MovementDetailData } from '../../@types/frontend.types'

export const ParseMovementDetails = (movements: MovementDetailData[]) => {
  return movements.map((movement: MovementDetailData) => {
    return {
      productId: movement.productId,
      quantity: movement.quantity
    }
  })
}
