import { prisma } from './backend/server/prisma-client/prisma-client'
import {
  RecordNameEnum,
  RecordTypeEnum,
  CategoryEnum,
  Product,
  Store,
  Record,
  RecordDetails,
  RecordType
} from '@prisma/client'

const deleteAllTables = async () => {
  console.log('Deleting all tables...')
  await prisma.recordDetails.deleteMany()
  await prisma.record.deleteMany()
  await prisma.stock.deleteMany()
  await prisma.product.deleteMany()
  await prisma.store.deleteMany()
  await prisma.recordType.deleteMany()
}

const createDefaultProducts = async () => {
  const defaultProducts: Omit<Product, 'id'>[] = [
    {
      name: 'Ender Pro 2',
      description: 'Impresora Ender Pro con 2 cabezales',
      price: 1500,
      category: CategoryEnum.IMPRESORA
    },
    {
      name: 'Hell Bot',
      description: 'Impresora Hell Bot',
      price: 3000,
      category: CategoryEnum.IMPRESORA
    },
    {
      name: 'Filamento Grilon Rosa',
      description: 'Color rosa Chicle',
      price: 1500,
      category: CategoryEnum.FILAMENTO
    },
    {
      name: 'Filamento Grilon Negro',
      description: 'Color Negro Carbon',
      price: 1500,
      category: CategoryEnum.FILAMENTO
    }
  ]

  console.log('inserting default products...')
  await prisma.product.createMany({
    data: defaultProducts
  })
}

const createDefaultStores = async () => {
  const defaultStores: Omit<Store, 'id'>[] = [
    { name: 'Deposito 1', address: 'Zona Centro' },
    { name: 'Deposito 2', address: 'Zona Sur' },
    { name: 'Deposito 3', address: 'Zona Norte' }
  ]

  console.log('inserting default stores...')
  await prisma.store.createMany({
    data: defaultStores
  })
}

const updateStocksQuantities = async () => {
  console.log('updating stocks quantities...')
  await prisma.stock.updateMany({
    data: {
      quantity: 10
    }
  })
}

const createDefaultRecordTypes = async () => {
  const defaultRecordTypes: Omit<RecordType, 'id'>[] = [
    {
      recordType: RecordTypeEnum.POSITIVE,
      recordName: RecordNameEnum.FACTURA_ORIGINAL,
      cause: 'Factura Original'
    },
    {
      recordType: RecordTypeEnum.NEGATIVE,
      recordName: RecordNameEnum.FACTURA_DUPLICADO,
      cause: 'Factura Duplicado'
    }
  ]

  console.log('inserting default record types...')
  await prisma.recordType.createMany({
    data: defaultRecordTypes
  })
}
const createDefaultRecords = async () => {
  const recordTypes = await prisma.recordType.findMany()
  const defaultRecords: Omit<Record, 'id' | 'datetime'>[] = recordTypes.map(
    (recordType) => {
      return {
        recordTypeId: recordType.id,
        observation: 'Factura original de prueba',
        senderName: 'Proveedor Juan Perez',
        address: 'Zona Centro'
      }
    }
  )
  console.log('inserting default records...')
  await prisma.record.createMany({
    data: defaultRecords
  })
}

const createDefaultRecordDetails = async () => {
  const stocks = await prisma.stock.findMany()
  const records = await prisma.record.findMany()

  const defaultRecordDetails: Promise<Omit<RecordDetails, 'id'>>[] =
    records.map(async (record) => {
      const randomStockId = Math.floor(Math.random() * stocks.length)
      const product = await prisma.product.findUnique({
        where: {
          id: stocks[randomStockId].productId
        }
      })
      const productPrice = product ? product.price : 0
      return {
        stockId: stocks[randomStockId].id,
        recordId: record.id,
        quantity: 7,
        subtotal: productPrice
      }
    })

  const results = await Promise.allSettled(defaultRecordDetails)

  const fulFilledResults = results.filter(
    (res) => res.status === 'fulfilled'
  ) as PromiseFulfilledResult<Omit<RecordDetails, 'id'>>[]

  console.log('inserting default record details...')
  await prisma.recordDetails.createMany({
    data: fulFilledResults.map((res) => res.value)
  })
}
const populateDatabase = async () => {
  try {
    await createDefaultProducts()
    await createDefaultStores()
    await updateStocksQuantities()
    await createDefaultRecordTypes()
    await createDefaultRecords()
    await createDefaultRecordDetails()
  } catch (error: any) {
    throw new Error(error)
  }
}
const main = async () => {
  try {
    await deleteAllTables()
    await populateDatabase()
  } catch (error: any) {
    throw new Error(error)
  }
}
main()
export {}
