/* eslint-disable no-useless-catch */
import { Movement } from '../../../../shared/schemas/movement.type'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getMovements = async () => {
  try {
    const movements: Movement[] = await prisma.movement.findMany()
    return movements
  } catch (error) {
    throw error
  }
}

const createMovement = async (
  observation: string,
  movementTypeId: string
) => {
  try {
    const movementCreated: Movement = await prisma.movement.create({
      data: { observation, movementTypeId }
    })
    return movementCreated
  } catch (error) {
    throw error
  }
}

const getMovementById = async (id: string) => {
  try {
    const movement: Movement = await prisma.movement.findUniqueOrThrow({
      where: {
        id
      }
    })
    return movement
  } catch (error) {
    throw error
  }
}

const updateMovementById = async (
  id: string,
  observation: string,
  movementTypeId: string
) => {
  try {
    await prisma.movement.findUniqueOrThrow({ where: { id } })

    if (!observation || !movementTypeId) {
      throw new Error(
        'Observation or movementTypeId must be provided!'
      )
    }

    const updatedMovement: Movement = await prisma.movement.update({
      where: { id },
      data: {
        observation,
        movementTypeId
      }
    })

    return updatedMovement
  } catch (error) {
    throw error
  }
}

const deleteMovementById = async (id: string) => {
  try {
    const deletedMovement: Movement = await prisma.movement.delete({
      where: { id }
    })
    return deletedMovement
  } catch (error) {
    throw error
  }
}

export {
  getMovements,
  createMovement,
  getMovementById,
  updateMovementById,
  deleteMovementById
}
