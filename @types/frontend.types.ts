import React, { Dispatch } from 'react'

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
  setSelectedProduct: Dispatch<string>
  selectedProduct: string
}

export type TableHeaderProps = {
  setGlobalFilterValue: Dispatch<string>
  globalFilterValue: string
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
