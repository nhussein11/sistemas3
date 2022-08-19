/* eslint-disable no-useless-catch */
import { Product } from '../../../../shared/schemas/product.type'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getProducts = async () => {
  try {
    const products: Product[] = await prisma.products.findMany()
    return products
  } catch (error) {
    throw error
  }
}

const createProduct = async (name: string, price: number) => {
  try {
    const productCreated: Product = await prisma.products.create({
      data: { name, price }
    })
    return productCreated
  } catch (error) {
    throw error
  }
}

const getProductById = async (id: string) => {
  try {
    const product: Product = await prisma.products.findUniqueOrThrow({
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

    const updatedProduct: Product = await prisma.products.update({
      where: { id },
      data: {
        name,
        price
      }
    })

    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteProductById = async (id: string) => {
  try {
    const deletedProduct: Product = await prisma.products.delete({
      where: { id }
    })
    return deletedProduct
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
