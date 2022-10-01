/* eslint-disable no-useless-catch */
import { Supplier } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getSuppliers = async () => {
  try {
    const supplier: Supplier[] = await prisma.supplier.findMany()
    return supplier
  } catch (error) {
    throw error
  }
}

const createSupplier = async (name: string, debt: number) => {
  try {
    const supplierCreated: Supplier = await prisma.supplier.create({
      data: { name, debt }
    })
    return supplierCreated
  } catch (error) {
    throw error
  }
}

const getSupplierById = async (id: string) => {
  try {
    const supplier: Supplier = await prisma.supplier.findUniqueOrThrow({
      where: {
        id
      }
    })
    return supplier
  } catch (error) {
    throw error
  }
}

const updateSupplierById = async (id: string, name: string, debt: number) => {
  try {
    await prisma.supplier.findUniqueOrThrow({ where: { id } })

    if (!name || !debt) {
      throw new Error('Name or address must be provided!')
    }

    const updatedSupplier: Supplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        debt
      }
    })

    return updatedSupplier
  } catch (error) {
    throw error
  }
}

const deleteSupplierById = async (id: string) => {
  try {
    const deletedSupplier: Supplier = await prisma.supplier.delete({
      where: { id }
    })
    return deletedSupplier
  } catch (error) {
    throw error
  }
}

export {
  getSuppliers,
  createSupplier,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById
}
