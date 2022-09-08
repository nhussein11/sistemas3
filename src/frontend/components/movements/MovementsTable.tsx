import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogNewMovement from './DialogNewMovement'
import DialogError from './DialogError'
import NumberFormat from 'react-number-format'
import { TableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'

const ProductsTable = ({ products }: TableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
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
          header={<TableHeader setDisplayBasic={setDisplayBasic} />}
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
        </DataTable>
      </div>
      <DialogNewMovement
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogError></DialogError>
    </div>
  )
}
export default ProductsTable
