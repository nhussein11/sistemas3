import { Movement } from '@prisma/client'

export const filterMovements = (movements: Movement[], search: string) => {
  return movements?.filter((movement) => {
    return movement.observation.toLowerCase().includes(search.toLowerCase())
  })
}
