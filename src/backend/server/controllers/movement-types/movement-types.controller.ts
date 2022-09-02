/* eslint-disable no-useless-catch */
import { MovementNameEnum, MovementType, MovementTypeEnum } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'

const getMovementsTypes = async () => {
  try {
    const movementsTypes: MovementType[] = await prisma.movementType.findMany()
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
    const movementTypeCreated: MovementType =
      await prisma.movementType.create({
        data: { movementType, movementName, cause }
      })
    return movementTypeCreated
  } catch (error) {
    throw error
  }
}

const getMovementTypeById = async (id: string) => {
  try {
    const movementType: MovementType | null =
      await prisma.movementType.findUnique({
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
    await prisma.movementType.findUniqueOrThrow({ where: { id } })

    if (!movementType || !movementName || !cause) {
      throw new Error('movementType, movementName or cause must be provided!')
    }

    const updatedMovementDetails: MovementType =
      await prisma.movementType.update({
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
    const deletedMovementType: MovementType =
      await prisma.movementType.delete({
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
