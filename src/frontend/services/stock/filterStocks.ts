import { Stock } from '@prisma/client'

export const filterStocks = (stores: Stock[], quantity: number) => {
  return stores?.filter((stock) => {
    return stock.quantity >= quantity
  })
}
