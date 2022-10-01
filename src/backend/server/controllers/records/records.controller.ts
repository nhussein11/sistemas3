/* eslint-disable no-useless-catch */
import { LetterEnum, Record, RecordType, RecordTypeEnum } from '@prisma/client'
import { prisma } from '../../prisma-client/prisma-client'
import { getRecordTypeById } from '../record-types/record-types.controller'
import {
  createRecordDetails,
  deleteRecordsDetailsByRecordId
} from '../record-details/record-details.controller'
import {
  createStock,
  getStockExisting,
  isStockEnough,
  updateStockById
} from '../stocks/stock.controller'
import { getStoreByIndex } from '../stores/stores.controller'
import { updateSupplierDebtById } from '../suppliers/suppliers.controller'
import { updateCustomerDebtById } from '../customers/customers.controller'
import { getProductPriceById } from '../products/products.controller'

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
  address: string,
  letter: LetterEnum,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  supplierId: string = '',
  customerId: string = '',
  details: any[]
) => {
  try {
    const recordType: RecordType | null = await getRecordTypeById(recordTypeId)
    if (!recordType) {
      return
    }
    const debt: number = await getDebt(details)

    await handleDebtByNewRecord(supplierId, debt, customerId)

    const data = await createDataOfRecord(
      supplierId,
      observation,
      address,
      letter,
      recordNumber,
      paidFor,
      recordTypeId,
      customerId
    )
    const recordCreated: Record = await prisma.record.create({
      data
    })

    await handleRecordDetailsCreation(recordType, recordCreated, details)

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
  address: string,
  letter: LetterEnum,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  supplierId: string = '',
  customerId: string = ''
) => {
  try {
    await prisma.record.findUniqueOrThrow({ where: { id } })

    if (!observation || !recordTypeId) {
      throw new Error('Observation or movementTypeId must be provided!')
    }
    const data = await createDataOfRecord(
      supplierId,
      observation,
      address,
      letter,
      recordNumber,
      paidFor,
      recordTypeId,
      customerId
    )
    const updatedMovement: Record = await prisma.record.update({
      where: { id },
      data
    })

    return updatedMovement
  } catch (error) {
    throw error
  }
}

const deleteRecordById = async (id: string) => {
  try {
    if (!id) {
      return
    }
    await deleteRecordsDetailsByRecordId(id)
    const deletedRecord: Record = await prisma.record.delete({
      where: { id }
    })
    return deletedRecord
  } catch (error) {
    throw error
  }
}

const handleRecordDetailsCreation = async (
  recordType: RecordType,
  recordCreated: Record,
  details: any[]
) => {
  for (const productIdAndQuantity of details) {
    const { productId, quantity } = productIdAndQuantity
    await handleStockChanges(productId, quantity, recordType.recordType)
  }

  const promiseArrayMovementsDetails = details.map(
    (stockIdQuantityAndSubtotal: any) => {
      const { stockId, quantity, subTotal } = stockIdQuantityAndSubtotal
      return createRecordDetails(stockId, recordCreated.id, quantity, subTotal)
    }
  )
  const allPromisesMovementsDetails = Promise.all(promiseArrayMovementsDetails)
  allPromisesMovementsDetails.then((movementDetails) => {
    movementDetails.map((results) => {
      return console.log(results)
    })
  })
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

// const handleRecordChangesByStockMovement = async (
//   stockId: string,
//   quantity: number
// ) => {
//   const recordTypePositive = await getRecordTypeByType(RecordTypeEnum.POSITIVE)
//   const recordPositive:Record = await prisma.record.create({
//     data: {
//       observation: 'Deposit movement IN',
//       address: 'Admin-Address',
//       recordTypeId: recordTypePositive.id
//     }
//   })
//   await createRecordDetails(stockId, recordPositive.id, quantity, 0)

//   const recordTypeNegative = await getRecordTypeByType(RecordTypeEnum.NEGATIVE)
//   console.log(recordTypeNegative)
//   const recordNegative = await prisma.record.create({
//     data: {
//       observation: 'Deposit movement OUT',
//       address: 'Admin-Address',
//       recordTypeId: recordTypeNegative.id
//     }
//   })
//   await createRecordDetails(stockId, recordNegative.id, quantity, 0)
// }

const getDebt = async (details: any[]) => {
  let debt: number = 0
  for (const productIdAndQuantity of details) {
    const { productId, quantity } = productIdAndQuantity
    const price: number = await getProductPriceById(productId)
    debt += price * quantity
  }
  return debt
}

export {
  getRecords,
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById
  // handleRecordChangesByStockMovement
}
const handleDebtByNewRecord = async (
  supplierId: string,
  debt: number,
  customerId: string
) => {
  supplierId !== ''
    ? await updateSupplierDebtById(supplierId, debt)
    : await updateCustomerDebtById(customerId, debt)
}

const createDataOfRecord = async (
  supplierId: string,
  observation: string,
  address: string,
  letter: LetterEnum,
  recordNumber: number,
  paidFor: boolean,
  recordTypeId: string,
  customerId: string
) => {
  return supplierId !== ''
    ? {
        observation,
        address,
        letter,
        recordNumber,
        paidFor,
        recordTypeId,
        supplierId
      }
    : {
        observation,
        address,
        letter,
        recordNumber,
        paidFor,
        recordTypeId,
        customerId
      }
}
