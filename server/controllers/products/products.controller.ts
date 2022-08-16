/* eslint-disable no-useless-catch */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getProducts = async () => {
  try {
    const products = await prisma.products.findMany()
    return products
  } catch (error) {
    throw error
  }
}

const createProduct = async (name: string, price: number) => {
  try {
    const productCreated = await prisma.products.create({
      data: { name, price }
    })

    return productCreated
  } catch (error) {
    throw error
  }
}

const getProductById = async (id: string) => {
  try {
    const product = await prisma.products.findUniqueOrThrow({
      where: {
        id
      }
    })
    return product
  } catch (error) {
    throw error
  }
}

const updateProductById = async (id: string, name: string, price: number) => {
  try {
    await prisma.products.findUniqueOrThrow({ where: { id } })

    if (!name || !price) {
      throw new Error('Name or price must be provided!')
    }

    const updatedUser = await prisma.products.update({
      where: { id },
      data: {
        name,
        price
      }
    })

    return updatedUser
  } catch (error) {
    throw error
  }
}

const deleteProductById = async (id: string) => {
  try {
    const deletedUser = await prisma.products.delete({
      where: { id }
    })
    return deletedUser
  } catch (error) {
    throw error
  }
}

export {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById
}
