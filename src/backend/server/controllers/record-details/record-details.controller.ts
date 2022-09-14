/* eslint-disable no-useless-catch */
import { RecordDetails } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'

const getRecordsDetails = async () => {
  try {
    const recordsDetails: RecordDetails[] =
      await prisma.recordDetails.findMany()
    return recordsDetails
  } catch (error) {
    throw error
  }
}

const createRecordDetails = async (
  stockId: string,
  recordId: string,
  quantity: number,
  subtotal: number
) => {
  try {
    const recordDetailCreated: RecordDetails =
      await prisma.recordDetails.create({
        data: { stockId, recordId, quantity, subtotal }
      })
    return recordDetailCreated
  } catch (error) {
    throw error
  }
}

const getRecordDetailsById = async (id: string) => {
  try {
    const recordDetails: RecordDetails =
      await prisma.recordDetails.findUniqueOrThrow({
        where: {
          id
        }
      })
    return recordDetails
  } catch (error) {
    throw error
  }
}

const updateRecordDetailsById = async (
  id: string,
  recordId: string,
  quantity: number
) => {
  try {
    await prisma.recordDetails.findUniqueOrThrow({ where: { id } })

    if (!recordId || !quantity) {
      throw new Error('productId, movementId or quantity must be provided!')
    }

    const updatedRecordDetails: RecordDetails =
      await prisma.recordDetails.update({
        where: { id },
        data: {
          recordId,
          quantity
        }
      })
    return updatedRecordDetails
  } catch (error) {
    throw error
  }
}

const deleteRecordDetailsById = async (id: string) => {
  try {
    const deletedRecordDetails: RecordDetails =
      await prisma.recordDetails.delete({
        where: { id }
      })
    return deletedRecordDetails
  } catch (error) {
    throw error
  }
}

const deleteRecordsDetailsByRecordId = async (id: string) => {
  try {
    const { count } = await prisma.recordDetails.deleteMany({
      where: { recordId: id }
    })
    return count
  } catch (error) {
    throw error
  }
}

export {
  getRecordsDetails,
  createRecordDetails,
  getRecordDetailsById,
  updateRecordDetailsById,
  deleteRecordDetailsById,
  deleteRecordsDetailsByRecordId
}
