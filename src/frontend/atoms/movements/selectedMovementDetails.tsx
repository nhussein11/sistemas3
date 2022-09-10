import { atom } from 'recoil'
import { MovementDetailData } from '../../@types/frontend.types'
export const defaultMovementDetails :Array<MovementDetailData> = []

export const selectedMovementDetailsState = atom({
  key: 'selectedMovementDetailsState',
  default: defaultMovementDetails
})
