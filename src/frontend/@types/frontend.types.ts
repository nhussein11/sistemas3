import { Product, Stock, Store, Record, Student, Enrollment } from '@prisma/client'
import { Dispatch } from 'react'
export type CourseFrontend = {
  id: string
  name: string
  hoursQuantity: number
  description: string
  price: number
}
export type TableProps = {
  products: Product[]
}
export type RecordsTableProps = {
  records: Record[]
}
export type StoresTableProps = {
  stores: Store[]
}
export type CoursesTableProps = {
  courses: CourseFrontend[]
}
export type StudentsTableProps = {
  students: Student[]
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
export type DialogNewRecordProps = {
  displayBasic: boolean
  closeDialog: () => void
}
export type DialogNewCourseProps = {
  displayBasic: boolean
  closeDialog: () => void
}
export type DialogFooterProps = {
  closeDialog: () => void
  handleCreateNewProduct: () => void
}
export type DialogFooterCoursesProps = {
  closeDialog: () => void
  handleCreateNewCourse: () => void
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
  storeId?: string
  quantity?: number
  minQuantity?: number
  productId?: string
}

export type StockTableProps = { stocks: Stock[] }
export type EnrollmentsTableProps = {enrollments: Enrollment[]}
export type StockDialogFooterProps = {
  closeDialog: () => void
  handleCreateNewStock: () => void
}
export type StockTableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
}
export type DialogFooterRecordProps = {
  closeDialog: () => void
  handleCreateNewRecord: () => void
}
export type RecordDetailData = {
  stockId: string
  productId: string
  storeId: string
  quantity: number
}
export type RecordsTableHeaderProps = {
  setDisplayBasic: Dispatch<boolean>
  setDisplayRecordDetailsTable: Dispatch<boolean | ((prev: boolean) => boolean)>
}
export type DialogRecordDetailsProps = {
  setDisplayRecordDetailsTable: Dispatch<boolean | ((prev: boolean) => boolean)>
  displayRecordDetailsTable: boolean
}
