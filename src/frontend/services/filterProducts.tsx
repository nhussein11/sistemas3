import { Product } from '../../shared/schemas/product.type'

export const filterProducts = (products: Product[], search: string) => {
  return products?.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase())
  })
}
