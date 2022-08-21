import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { TableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'
import DialogNewProduct from './DialogNewProduct'
import DialogUpdateProduct from './DialogUpdateProduct'
import useDeleteProductMutation from '../../hooks/products/useDeleteProductMutation'

const ProductsTable = ({ products }: TableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteProduct } = useDeleteProductMutation('products')
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
            alignHeader={'center'}
          />
          <Column
            field="Id"
            header="Id"
            body={(rowData) => rowData.id}
            alignHeader={'center'}
          />
          <Column
            field="Nombre"
            header="Nombre"
            body={(rowData) => rowData.name}
            alignHeader={'center'}
          />
          <Column
            field="Descripcion"
            header="Descripcion"
            body={(rowData) => rowData.descripcion}
            alignHeader={'center'}
          />
          <Column
            field="Precio"
            header="Precio"
            body={(rowData) => rowData.price}
            alignHeader={'center'}
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
