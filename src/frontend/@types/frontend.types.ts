import { Dispatch } from 'react'
import { Product } from '../../shared/schemas/product.type'

export type TableProps = {
  products: Product[]
}

export type SelectBodyTemplateProps = {
  rowData: Product
}

export type TableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
  handleDeleteProduct: () => void
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
