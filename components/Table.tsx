import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import DialogNewProduct from './DialogNewProduct'
import SelectBodyTemplate from './SelectBodyTemplate'
const Table = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)

  const onGlobalFilterChange = (e: { target: { value: any } }) => {
    const value = e.target.value
    setGlobalFilterValue(value)
  }
  const renderHeader = () => {
    return (
      <div className="header-table">
        <div className="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Limpiar"
            className="p-button-outlined"
            onClick={() => setGlobalFilterValue('')}
          />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar"
            />
          </span>
        </div>
        <div className="actionsButtonsTable">
          <Button
            label="Nuevo"
            className="p-button-raised p-button-success"
            onClick={() => setDisplayBasic(true)}
          />
          <Button
            label="Borrar"
            className="p-button-raised p-button-danger"
            onClick={() => setDisplayBasic(true)}
          />
          <Button
            label="Modificar"
            className="p-button-raised p-button-secondary"
            onClick={() => setDisplayBasic(true)}
          />
        </div>
      </div>
    )
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
  const header = renderHeader()
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
          header={header}
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
