/* eslint-disable no-useless-catch */
import { Record, RecordType, RecordTypeEnum } from '@prisma/client'
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

const getRecords = async () => {
  try {
    const records: Record[] = await prisma.record.findMany()
    return records
  } catch (error) {
    throw error
  }
}

const createRecord = async (
  observation: string,
  recordTypeId: string,
  details: any[]
) => {
  try {
    const recordType: RecordType | null = await getMovementTypeById(
      recordTypeId
    )
    if (!recordType) {
      return
    }
    const recordCreated: Record = await prisma.record.create({
      data: { observation, recordTypeId }
    })

    for (const productIdAndQuantity of details) {
      const { productId, quantity } = productIdAndQuantity
      await handleStockChanges(productId, quantity, recordType.recordType)
    }

    const promiseArrayMovementsDetails = details.map(
      (productIdAndQuantity: any) => {
        const { productId, quantity } = productIdAndQuantity
        return createMovementDetails(productId, recordCreated.id, quantity)
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

    return recordCreated
  } catch (error) {
    throw error
  }
}

const getRecordById = async (id: string) => {
  try {
    const record: Record = await prisma.record.findUniqueOrThrow({
      where: {
        id
      }
    })
    return record
  } catch (error) {
    throw error
  }
}

const updateRecordById = async (
  id: string,
  observation: string,
  recordTypeId: string
) => {
  try {
    await prisma.record.findUniqueOrThrow({ where: { id } })

    if (!observation || !recordTypeId) {
      throw new Error('Observation or movementTypeId must be provided!')
    }

    const updatedMovement: Record = await prisma.record.update({
      where: { id },
      data: {
        observation,
        recordTypeId
      }
    })

    return updatedMovement
  } catch (error) {
    throw error
  }
}

const deleteRecordById = async (id: string) => {
  try {
    const deletedRecord: Record = await prisma.record.delete({
      where: { id }
    })
    return deletedRecord
  } catch (error) {
    throw error
  }
}

const handleStockChanges = async (
  productId: string,
  quantity: number,
  recordType: RecordTypeEnum
) => {
  if (recordType === RecordTypeEnum.POSITIVE) {
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

  if (recordType === RecordTypeEnum.NEGATIVE) {
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
  getRecords,
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById
}
