import { MovementNameEnum, MovementTypeEnum } from '@prisma/client'

export type MovementType = {
  id: string
  movementType: MovementTypeEnum
  movementName: MovementNameEnum
  cause: string
}
