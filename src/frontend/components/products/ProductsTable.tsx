import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import DialogNewProduct from './DialogNewProduct'
import DialogUpdateProduct from './DialogUpdateProduct'
import DialogError from './DialogError'
import NumberFormat from 'react-number-format'
import { TableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import useDeleteProductMutation from '../../hooks/products/useDeleteProductMutation'
import { useRecoilState } from 'recoil'
import { selectedProductState } from '../../atoms/products/selectedProductAtom'
import {
  showUpdateDialogState,
  UPDATE_MODES_ENUM
} from '../../atoms/showUpdateDialogAtom'
import { isLoadState } from '../../atoms/isLoadState'

const ProductsTable = ({ products }: TableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteProduct } = useDeleteProductMutation('products')
  const [, setSelectedProduct] = useRecoilState(selectedProductState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [loading] = useRecoilState(isLoadState)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={products}
          paginator
          loading={loading}
          className="p-datatable-customers"
          showGridlines
          rows={4}
          dataKey="id"
          responsiveLayout="scroll"
          header={<TableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="Nombre"
            header="Nombre"
            body={(rowData) => rowData.name}
            alignHeader={'center'}
          />
          <Column
            field="Descripcion"
            header="Descripcion"
            body={(rowData) => rowData.description}
            alignHeader={'center'}
          />
          <Column
            field="Category"
            header="Categoría"
            body={(rowData) => rowData.category}
            alignHeader={'center'}
          />
          <Column
            field="Precio"
            header="Precio"
            body={(rowData) => {
              return (
                <NumberFormat
                  value={rowData.price}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                ></NumberFormat>
              )
            }}
            alignHeader={'center'}
          />
          <Column
            field="options"
            header="Opciones"
            body={(rowData) => {
              return (
                <div>
                  <Button
                    icon="pi pi-pencil"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-warning"
                    onClick={() => {
                      setSelectedProduct(rowData)
                      setShowUpdateDialog({
                        showUpdateDialog: true,
                        updateMode: UPDATE_MODES_ENUM.PRODUCT_UPDATE
                      })
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-danger"
                    onClick={() => {
                      setSelectedProduct(rowData)
                      handleDeleteProduct()
                      setDisplayBasic(false)
                    }}
                  />
                </div>
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewProduct
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateProduct />
      <DialogError></DialogError>
    </div>
  )
}
export default ProductsTable
