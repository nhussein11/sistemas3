/* eslint-disable no-useless-catch */
import { MovementNameEnum, RecordType, MovementTypeEnum } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'

const getMovementsTypes = async () => {
  try {
    const movementsTypes: RecordType[] = await prisma.recordType.findMany()
    return movementsTypes
  } catch (error) {
    throw error
  }
}

const createMovementType = async (
  movementType: MovementTypeEnum,
  movementName: MovementNameEnum,
  cause: string
) => {
  try {
    const movementTypeCreated: RecordType =
      await prisma.recordType.create({
        data: { movementType, movementName, cause }
      })
    return movementTypeCreated
  } catch (error) {
    throw error
  }
}

const getMovementTypeById = async (id: string) => {
  console.log(id)
  try {
    const movementType: RecordType | null =
      await prisma.recordType.findUnique({
        where: {
          id
        }
      })
    return movementType
  } catch (error) {
    throw error
  }
}

const updateMovementTypeById = async (
  id: string,
  movementType: MovementTypeEnum,
  movementName: MovementNameEnum,
  cause: string
) => {
  try {
    await prisma.recordType.findUniqueOrThrow({ where: { id } })

    if (!movementType || !movementName || !cause) {
      throw new Error('movementType, movementName or cause must be provided!')
    }

    const updatedMovementDetails: RecordType =
      await prisma.recordType.update({
        where: { id },
        data: {
          movementType,
          movementName,
          cause
        }
      })
    return updatedMovementDetails
  } catch (error) {
    throw error
  }
}

const deleteMovementTypeById = async (id: string) => {
  try {
    const deletedMovementType: RecordType =
      await prisma.recordType.delete({
        where: { id }
      })
    return deletedMovementType
  } catch (error) {
    throw error
  }
}

export {
  getMovementsTypes,
  createMovementType,
  getMovementTypeById,
  updateMovementTypeById,
  deleteMovementTypeById
}
