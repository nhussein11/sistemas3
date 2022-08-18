import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DialogNewProduct from './DialogNewProduct'
import SelectBodyTemplate from './SelectBodyTemplate'
import TableHeader from './TableHeader'
const Table = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)

  const onGlobalFilterChange = (e: { target: { value: any } }) => {
    const value = e.target.value
    setGlobalFilterValue(value)
  }
  const prodsExample = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripcion del producto 1',
      precio: '100'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripcion del producto 2',
      precio: '200'
    }
  ]
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={prodsExample}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={
            <TableHeader
              setGlobalFilterValue={setGlobalFilterValue}
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={onGlobalFilterChange}
              setDisplayBasic={setDisplayBasic}
            />
          }
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="select"
            header="Select"
            body={SelectBodyTemplate}
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
            body={(rowData) => rowData.nombre}
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
            body={(rowData) => rowData.precio}
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
