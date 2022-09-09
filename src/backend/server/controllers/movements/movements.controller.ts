/* eslint-disable no-useless-catch */
import { Movement, MovementType, MovementTypeEnum } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import { getMovementTypeById } from '../movement-types/movement-types.controller'
import { createMovementDetails } from '../movements-details/movement-details.controller'
import {
  createStock,
  getStockExisting,
  isStockEnough,
  updateStockById
} from '../stocks/stock.controller'
import { getStoreByIndex } from '../stores/stores.controller'

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
  productIdAndQuantities: any[]
) => {
  try {
    const movementType: MovementType | null = await getMovementTypeById(
      movementTypeId
    )
    if (!movementType) {
      return
    }
    const movementCreated: Movement = await prisma.movement.create({
      data: { observation, movementTypeId }
    })

    for (const productIdAndQuantity of productIdAndQuantities) {
      const { productId, quantity } = productIdAndQuantity
      await handleStockChanges(productId, quantity, movementType.movementType)
    }

    const promiseArrayMovementsDetails = productIdAndQuantities.map(
      (productIdAndQuantity: any) => {
        const { productId, quantity } = productIdAndQuantity
        return createMovementDetails(productId, movementCreated.id, quantity)
      }
    )
    const allPromisesMovementsDetails = Promise.all(
      promiseArrayMovementsDetails
    )
    allPromisesMovementsDetails.then((movementDetails) => {
      movementDetails.map((results) => {
        return console.log(results)
      })
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

const handleStockChanges = async (
  productId: string,
  quantity: number,
  movementType: MovementTypeEnum
) => {
  if (movementType === MovementTypeEnum.POSITIVE) {
    const store = await getStoreByIndex(0)
    const { id: storeId } = store
    const stockToSell = await isStockEnough(productId, quantity)
    if (!stockToSell) {
      return
    }
    const updatedStock = await updateStockById(
      stockToSell.id,
      productId,
      storeId,
      stockToSell.quantity - quantity,
      stockToSell.minQuantity
    )
    return updatedStock
  }

  if (movementType === MovementTypeEnum.NEGATIVE) {
    const store = await getStoreByIndex(1)
    const { id: storeId } = store
    const stockToUpdate = await getStockExisting(productId, storeId)
    if (!stockToUpdate) {
      await createStock(productId, storeId, quantity)
    } else {
      const updatedStock = await updateStockById(
        stockToUpdate.id,
        productId,
        storeId,
        stockToUpdate.quantity + quantity,
        stockToUpdate.minQuantity
      )
      return updatedStock
    }
  }
}

export {
  getMovements,
  createMovement,
  getMovementById,
  updateMovementById,
  deleteMovementById
}
