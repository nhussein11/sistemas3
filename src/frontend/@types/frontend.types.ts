import { Product } from '@prisma/client'
import { Dispatch } from 'react'

export type TableProps = {
  products: Product[]
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
