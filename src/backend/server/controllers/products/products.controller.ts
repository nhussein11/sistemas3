/* eslint-disable no-useless-catch */
import { CategoryEnum } from '@prisma/client'
import { Product } from '../../../../shared/schemas/product.type'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getProducts = async () => {
  try {
    const products: Product[] = await prisma.product.findMany()
    return products
  } catch (error) {
    throw error
  }
}

const createProduct = async (name: string, price: number, description: string, category: CategoryEnum) => {
  try {
    const productCreated: Product = await prisma.product.create({
      data: { name, price, description, category }
    })
    return productCreated
  } catch (error) {
    throw error
  }
}

const getProductById = async (id: string) => {
  try {
    const product: Product = await prisma.product.findUniqueOrThrow({
      where: {
        id
      }
    })
    return product
  } catch (error) {
    throw error
  }
}

const updateProductById = async (id: string, name: string, price: number, description: string, category:CategoryEnum) => {
  try {
    await prisma.product.findUniqueOrThrow({ where: { id } })

    if (!name || !price || !description || !category) {
      throw new Error('Name, price, description or category must be provided!')
    }

    const updatedProduct: Product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        category
      }
    })

    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteProductById = async (id: string) => {
  try {
    const deletedProduct: Product = await prisma.product.delete({
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
