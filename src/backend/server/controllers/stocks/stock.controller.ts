/* eslint-disable no-useless-catch */
import { Stock } from '../../../../shared/schemas/stock.type'
import { prisma } from '../../../server/prisma-client/prisma-client'

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
  minQuantity: number
) => {
  try {
    // const stockExisting: Stock = await getProductExistingById(
    //   productId, storeId
    // )
    try {
      await updateStockById(stockExisting.id, quantity)
    } catch (error) {
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

const updateStockById = async (id: string, quantity: number) => {
  try {
    await prisma.stock.findUniqueOrThrow({ where: { id } })
    // agregar la posibilidad de actuliazar tanto el storeId como el min quantity, ademas queantity
    if (!quantity) {
      throw new Error('Quantity must be provided!')
    }

    const updatedStock: Stock = await prisma.stock.update({
      where: { id },
      data: {
        quantity
      }
    })

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

const getProductExistingById = async (productId: string) => {
  try {
    const stock: Stock = await prisma.stock.findUniqueOrThrow({
      where: {
        productId
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
  getProductExistingById
}
