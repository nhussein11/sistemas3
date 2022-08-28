/* eslint-disable no-useless-catch */
import { MovementDetails } from '../../../../shared/schemas/movement-details.type'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getMovementsDetails = async () => {
  try {
    const movementsDetails: MovementDetails[] =
      await prisma.movementDetails.findMany()
    return movementsDetails
  } catch (error) {
    throw error
  }
}

const createMovementDetails = async (productId:string, movementId:string, quantity:number) => {
  try {
    const movementDetailCreated: MovementDetails = await prisma.movementDetails.create({
      data: { productId, movementId, quantity }
    })
    return movementDetailCreated
  } catch (error) {
    throw error
  }
}

const getMovementDetailsById = async (id: string) => {
  try {
    const movementDetails: MovementDetails = await prisma.movementDetails.findUniqueOrThrow({
      where: {
        id
      }
    })
    return movementDetails
  } catch (error) {
    throw error
  }
}

const updateMovementDetailsById = async (
  id:string,
  productId: string,
  movementId: string,
  quantity:number
) => {
  try {
    await prisma.movementDetails.findUniqueOrThrow({ where: { id } })

    if (!productId || !movementId || !quantity) {
      throw new Error(
        'productId, movementId or quantity must be provided!'
      )
    }

    const updatedMovementDetails: MovementDetails = await prisma.movementDetails.update({
      where: { id },
      data: {
        productId,
        movementId,
        quantity
      }
    })

    return updatedMovementDetails
  } catch (error) {
    throw error
  }
}

const deleteMovementDetailsById = async (id: string) => {
  try {
    const deletedMovementDetails: MovementDetails = await prisma.movementDetails.delete({
      where: { id }
    })
    return deletedMovementDetails
  } catch (error) {
    throw error
  }
}

export {
  getMovementsDetails,
  createMovementDetails,
  getMovementDetailsById,
  updateMovementDetailsById,
  deleteMovementDetailsById
}
