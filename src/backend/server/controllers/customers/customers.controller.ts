/* eslint-disable no-useless-catch */
import { Customer } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getCustomers = async () => {
  try {
    const customer: Customer[] = await prisma.customer.findMany()
    return customer
  } catch (error) {
    throw error
  }
}

const createCustomer = async (name: string, debt: number) => {
  try {
    const customerCreated: Customer = await prisma.customer.create({
      data: { name, debt }
    })
    return customerCreated
  } catch (error) {
    throw error
  }
}

const getCustomerById = async (id: string) => {
  try {
    const customer: Customer = await prisma.customer.findUniqueOrThrow({
      where: {
        id
      }
    })
    return customer
  } catch (error) {
    throw error
  }
}

const updateCustomerById = async (id: string, name: string, debt: number) => {
  try {
    await prisma.customer.findUniqueOrThrow({ where: { id } })

    if (!name || !debt) {
      throw new Error('Name or address must be provided!')
    }

    const updatedCustomer: Customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        debt
      }
    })

    return updatedCustomer
  } catch (error) {
    throw error
  }
}

const deleteCustomerById = async (id: string) => {
  try {
    const deletedCustomer: Customer = await prisma.customer.delete({
      where: { id }
    })
    return deletedCustomer
  } catch (error) {
    throw error
  }
}

const updateCustomerDebtById = async (id: string, debt: number) => {
  await prisma.customer.update({
    where: { id },
    data: {
      debt
    }
  })
}

export {
  getCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  updateCustomerDebtById
}
