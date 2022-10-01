/* eslint-disable no-useless-catch */
import { Stock } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'
// import { handleRecordChangesByStockMovement } from '../records/records.controller'

const getStocks = async () => {
  try {
    const stocks: Stock[] = await prisma.stock.findMany()
    return stocks
  } catch (error) {
    throw error
  }
}

const createStock = async (
  productId: string,
  storeId: string,
  quantity: number,
  minQuantity: number = 0
) => {
  try {
    const stockExisting: Stock | null = await getStockExisting(
      productId,
      storeId
    )
    if (!stockExisting) {
      const stockCreated: Stock = await prisma.stock.create({
        data: {
          productId,
          storeId,
          quantity,
          minQuantity
        }
      })
      return stockCreated
    }
    await updateStockById(
      stockExisting.id,
      productId,
      storeId,
      quantity,
      minQuantity
    )
    return updateStockById
  } catch (error) {
    throw error
  }
}
const getStockById = async (id: string) => {
  try {
    const stock: Stock = await prisma.stock.findUniqueOrThrow({
      where: {
        id
      }
    })
    return stock
  } catch (error) {
    throw error
  }
}

const updateStockById = async (
  id: string,
  productId: string = '',
  storeId: string,
  quantity: number,
  minQuantity: number
) => {
  let quantityDeletedStock: number = 0
  try {
    await prisma.stock.findUniqueOrThrow({ where: { id } })
    if (!storeId && !quantity && !minQuantity) {
      throw new Error('Store id or quantity or min quantity must be provided!')
    }
    if (minQuantity) {
      const updatedStock: Stock = await prisma.stock.update({
        where: { id },
        data: {
          minQuantity
        }
      })
      return updatedStock
    }
    console.log('storeId: ', storeId)
    const stockExisting = await getStockExisting(productId, storeId)
    if (stockExisting && stockExisting.id !== id) {
      quantityDeletedStock = stockExisting.quantity
      await deleteStockById(stockExisting.id)
    }

    const updatedStock: Stock = await prisma.stock.update({
      where: { id },
      data: {
        storeId,
        quantity: quantity + quantityDeletedStock
      }
    })
    // TODO: preguntar en que queda esto
    // await handleRecordChangesByStockMovement(updatedStock.id, quantity)
    return updatedStock
  } catch (error) {
    throw error
  }
}

const deleteStockById = async (id: string) => {
  try {
    const deletedStock: Stock = await prisma.stock.delete({
      where: { id }
    })
    return deletedStock
  } catch (error) {
    throw error
  }
}

const getStockExisting = async (productId: string, storeId: string) => {
  try {
    const stock: Stock | null = await prisma.stock.findFirst({
      where: {
        productId,
        storeId
      }
    })
    return stock
  } catch (error) {
    throw error
  }
}

const isStockEnough = async (productId: string, quantity: number) => {
  try {
    const stock: Stock | null = await prisma.stock.findFirst({
      where: {
        productId,
        quantity: {
          gt: quantity
        }
      }
    })
    return stock
  } catch (error) {
    throw error
  }
}

export {
  getStocks,
  createStock,
  getStockById,
  updateStockById,
  deleteStockById,
  getStockExisting,
  isStockEnough
}
