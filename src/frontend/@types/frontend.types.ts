import { Product, Stock, Store, Movement } from '@prisma/client'
import { Dispatch } from 'react'

export type TableProps = {
  products: Product[]
}
export type MovementsTableProps = {
  movements: Movement[]
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
export type DialogNewMovementProps = {
  displayBasic: boolean
  closeDialog: () => void
}

export type DialogFooterProps = {
  closeDialog: () => void
  handleCreateNewProduct: () => void
}
export type DialogNewStoreProps = {
  displayBasic: boolean
  closeDialog: () => void
}

export type SummaryProps = {
  inStock: number
  noStock: string
  available: number
}

export type CardProps = {
  name: string
  value: string
  icon: string
  color: string
}
export type StoreCheckedBodyTemplateProps = {
  rowData: Store
}
export type StoreDialogFooterProps = {
  closeDialog: () => void
  handleCreateNewStore: () => void
}

export type StockCheckedBodyTemplateProps = {
  rowData: Stock
}

export type DialogNewStockProps = {
  displayBasic: boolean
  closeDialog: () => void
}

export type StockUpdateData = {
  id: string
  storeId: string
  quantity: number
  minQuantity: number
  productId: string
}

export type StockTableProps = { stocks: Stock[] }

export type StockDialogFooterProps = {
  closeDialog: () => void
  handleCreateNewStock: () => void
}
export type StockTableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
}
export type DialogFooterMovementProps = {
  closeDialog: () => void
  handleCreateNewMovement: () => void
}
export type MovementDetailData = {
  productId: string
  quantity: number
  name: string
  price: number
}
export type MovementsTableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
  setDisplayMovementDetailsTable: Dispatch<
    boolean | ((prev: boolean) => boolean)
  >
}
export type DialogMovementDetailsProps = {
  setDisplayMovementDetailsTable: Dispatch<
    boolean | ((prev: boolean) => boolean)
  >
  displayMovementDetailsTable: boolean
}
