/* eslint-disable no-useless-catch */
import { Movement, MovementType, MovementTypeEnum, Stock } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import { getMovementTypeById } from '../movement-types/movement-types.controller'
import { createMovementDetails } from '../movements-details/movement-details.controller'
import {
  createStock,
  getStockExisting,
  isStockEnough,
  updateStockById
} from '../stocks/stock.controller'

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
  movementTypeId: string,
  productId: string,
  quantity: number
) => {
  try {
    const movementType: MovementType | null = await getMovementTypeById(
      movementTypeId
    )
    if (!movementType) {
      return
    }
    // si es venta, checkeo que tenga stock para vender
    if (movementType.movementType === MovementTypeEnum.POSITIVE) {
      const stockToSell: Stock | null = await isStockEnough(productId, quantity)
      if (!stockToSell) {
        return
      }
      // Actualizo el stock
      await updateStockById(
        stockToSell.id,
        productId,
        stockToSell.storeId,
        (stockToSell.quantity -= quantity),
        stockToSell.minQuantity
      )
    }
    if (movementType.movementType === MovementTypeEnum.NEGATIVE) {

      // Aca tengo la duda de: Tendria que actualizar fijarme si el stock existe o no?, en base a eso crear uno, lo dejo platneado:
      // Actualizo el stock
      const stockToUpdate: Stock | null = await getStockExisting(
        productId,
        storeId
      )
      if (!stockToUpdate) {
        await createStock(productId, storeId, quantity)
      } else {
        await updateStockById(
          stockToUpdate.id,
          productId,
          stockToUpdate.storeId,
          (stockToUpdate.quantity += quantity),
          stockToUpdate.minQuantity
        )
      }
    }
    const movementCreated: Movement = await prisma.movement.create({
      data: { observation, movementTypeId }
    })
    await createMovementDetails(productId, movementCreated.id, quantity)
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
      throw new Error('Observation or movementTypeId must be provided!')
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
