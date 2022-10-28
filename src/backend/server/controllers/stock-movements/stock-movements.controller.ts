import {
  LetterEnum,
  Record,
  RecordNameEnum,
  RecordType,
  Stock
} from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
import { getRecordTypeById } from '../record-types/record-types.controller'
import { getStockExisting, updateStockById } from '../stocks/stock.controller'

const createRecordByStockMovement = async (
  recordTypeId: string,
  quantity: number,
  storeId: string,
  productId: string
) => {
  const recordType: RecordType | null = await getRecordTypeById(recordTypeId)
  if (!recordType) {
    throw new Error('Record Type not found')
  }
  await handleStockMovementByRecordType(
    recordType,
    quantity,
    storeId,
    productId
  )

  const recordCreated: Record = await prisma.record.create({
    data: {
      observation: 'Stock Movement between stores',
      address: '',
      letter: LetterEnum.X,
      recordNumber: -1,
      paidFor: false,
      recordTypeId
    }
  })

  return recordCreated
}

export { createRecordByStockMovement }

const handleStockMovementByRecordType = async (
  recordType: RecordType,
  quantity: number,
  storeId: string,
  productId: string
) => {
  const stock: Stock | null = await getStockExisting(productId, storeId)
  if (!stock) {
    throw new Error('Stock not found')
  }

  if (recordType.recordName === RecordNameEnum.MOVIENTO_DE_STOCK_INGRESO) {
    await prisma.stock.update({
      where: {
        id: stock.id
      },
      data: {
        quantity: stock.quantity + quantity
      }
    })
  }

  if (recordType.recordName === RecordNameEnum.MOVIENTO_DE_STOCK_EGRESO) {
    await prisma.stock.update({
      where: {
        id: stock.id
      },
      data: {
        quantity: stock.quantity - quantity
      }
    })
  }
}
