import { MovementType } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
export const resolveMovementName = (
  movementTypeId: string,
  movementTypesQuery : UseQueryResult<{ movementsTypes:MovementType[] }, unknown>
): string | undefined => {
  const movementType = movementTypesQuery.data?.movementsTypes?.find(
    (movementType: MovementType) => movementType.id === movementTypeId
  )
  return movementType?.movementName
}
