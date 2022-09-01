import { Dispatch } from 'react'
import { Product } from '../../shared/schemas/product.type'
import { Store } from '../../shared/schemas/store.type'

export type TableProps = {
  products: Product[]
}
export type StoresTableProps = {
stores: Store[]
}
export type SelectBodyTemplateProps = {
  rowData: Product
}

export type TableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
}

export type DialogNewProductProps = {
  displayBasic: boolean
  closeDialog: () => void
}

export type DialogFooterProps = {
  closeDialog: () => void
  handleCreateNewProduct: () => void
}

export type SummaryProps = {
  inStock: number
  noStock: string
  available: number
}

export type CardProps = {
  name : string
  value : string
  icon : string
  color : string
}
