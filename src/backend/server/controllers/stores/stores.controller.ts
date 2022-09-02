/* eslint-disable no-useless-catch */
import { Store } from '@prisma/client'
import { prisma } from '../../../server/prisma-client/prisma-client'

const getStores = async () => {
  try {
    const stores: Store[] = await prisma.store.findMany()
    return stores
  } catch (error) {
    throw error
  }
}

const createStore = async (name: string, address: string) => {
  try {
    const storeCreated: Store = await prisma.store.create({
      data: { name, address }
    })
    return storeCreated
  } catch (error) {
    throw error
  }
}
const getStoreById = async (id: string) => {
  try {
    const store: Store = await prisma.store.findUniqueOrThrow({
      where: {
        id
      }
    })
    return store
  } catch (error) {
    throw error
  }
}

const updateStoreById = async (id: string, name: string, address: string) => {
  try {
    await prisma.store.findUniqueOrThrow({ where: { id } })

    if (!name || !address) {
      throw new Error('Name or address must be provided!')
    }

    const updatedStore: Store = await prisma.store.update({
      where: { id },
      data: {
        name,
        address
      }
    })

    return updatedStore
  } catch (error) {
    throw error
  }
}

const deleteStoreById = async (id: string) => {
  try {
    const deletedStore: Store = await prisma.store.delete({
      where: { id }
    })
    return deletedStore
  } catch (error) {
    throw error
  }
}

export { getStores, createStore, getStoreById, updateStoreById, deleteStoreById }
