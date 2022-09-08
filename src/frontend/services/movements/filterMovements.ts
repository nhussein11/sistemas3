import { Movement } from '@prisma/client'

export const filterMovements = (movements: Movement[], search: string) => {
  return movements?.filter((movement) => {
    return movement.movementTypeId.toLowerCase().includes(search.toLowerCase())
  })
}
