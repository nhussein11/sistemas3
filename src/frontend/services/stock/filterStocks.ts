import { Stock } from '../../../shared/schemas/stock.type'

export const filterStocks = (stores: Stock[], quantity: number) => {
  return stores?.filter((stock) => {
    return stock.quantity >= quantity
  })
}
