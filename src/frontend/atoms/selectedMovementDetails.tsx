import { atom } from 'recoil'
import { MovementDetailData } from '../@types/frontend.types'
export const defaultMovementDetails :Array<MovementDetailData> = [{
  productId: '',
  name: '',
  price: 0,
  quantity: 0
}]

export const selectedMovementDetailsState = atom({
  key: 'selectedMovementDetailsState',
  default: defaultMovementDetails
})
