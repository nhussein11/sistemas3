import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { TableProps } from '../../@types/frontend.types'
import useTableMutations from '../../hooks/useTableMutations'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'
import DialogNewProduct from './DialogNewProduct'
import DialogUpdateProduct from './DialogUpdateProduct'

const ProductsTable = ({ products }: TableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteProduct } = useTableMutations()
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
                rowData
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
      <DialogUpdateProduct />
    </div>
  )
}
export default ProductsTable
