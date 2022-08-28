/* eslint-disable no-useless-catch */
import { Store } from '../../../../shared/schemas/store.type'
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

export { getStores, createStore }
