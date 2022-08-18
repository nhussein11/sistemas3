import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DialogNewProduct from './DialogNewProduct'
import SelectBodyTemplate from './SelectBodyTemplate'
import TableHeader from './TableHeader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../services/deleteProducts'
import { TableProps } from '../@types/frontend.types'

const Table = ({ products }: TableProps) => {
  const queryClient = useQueryClient()
  const [displayBasic, setDisplayBasic] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const { mutate } = useMutation(
    (productId: string) => deleteProduct(productId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['products'])
        setSelectedProduct('')
      }
    }
  )
  const handleDeleteProduct = () => {
    mutate(selectedProduct)
  }
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={products}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={
            <TableHeader
              handleDeleteProduct={handleDeleteProduct}
              setGlobalFilterValue={setGlobalFilterValue}
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
              setDisplayBasic={setDisplayBasic}
            />
          }
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="select"
            header="Select"
            body={(rowData) =>
              SelectBodyTemplate({
                rowData,
                setSelectedProduct,
                selectedProduct
              })
            }
            style={{ minWidth: '5rem' }}
          />
          <Column
            field="id"
            header="id"
            body={(rowData) => rowData.id}
            style={{ minWidth: '5rem' }}
          />
          <Column
            field="nombre"
            header="nombre"
            body={(rowData) => rowData.name}
            style={{ minWidth: '5rem' }}
          />
          <Column
            field="descripcion"
            header="descripcion"
            body={(rowData) => rowData.descripcion}
            style={{ minWidth: '5rem' }}
          />
          <Column
            field="precio"
            header="precio"
            body={(rowData) => rowData.price}
            style={{ minWidth: '5rem' }}
          />
        </DataTable>
      </div>
      <DialogNewProduct
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
    </div>
  )
}
export default Table
