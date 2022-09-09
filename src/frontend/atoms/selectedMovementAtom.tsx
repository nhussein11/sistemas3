import { atom } from 'recoil'
export const defaultMovement = {
  id: '',
  datetime: new Date(),
  observation: '',
  movementTypeId: ''
}
export const selectedMovementState = atom({
  key: 'selectedMovementState',
  default: defaultMovement
})
