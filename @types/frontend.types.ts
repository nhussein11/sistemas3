import { Dispatch } from 'react'

export type Product = {
  id: string
  name: string
  price: number
}
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
