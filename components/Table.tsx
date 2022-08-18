import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import DialogNewProduct from './DialogNewProduct'
import SelectBodyTemplate from './SelectBodyTemplate'
const Table = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const dialogFuncMap = {
    displayBasic: setDisplayBasic
  }
  const openDialog = () => {
    dialogFuncMap.displayBasic(true)
  }
  const closeDialog = () => {
    dialogFuncMap.displayBasic(false)
  }

  const clearFilter = () => {
    initFilters()
  }
  useEffect(() => {
    initFilters()
  }, [])
  const onGlobalFilterChange = (e: { target: { value: any } }) => {
    const value = e.target.value
    setGlobalFilterValue(value)
  }

  const initFilters = () => {
    setGlobalFilterValue('')
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
            onClick={clearFilter}
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
            onClick={() => openDialog()}
          />
          <Button
            label="Borrar"
            className="p-button-raised p-button-danger"
            onClick={() => openDialog()}
          />
          <Button
            label="Modificar"
            className="p-button-raised p-button-secondary"
            onClick={() => openDialog()}
          />
        </div>
      </div>
    )
  }
  const renderFooter = (name: string) => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => closeDialog()}
          className="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={() => closeDialog()}
          autoFocus
        />
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
        closeDialog={closeDialog}
        renderFooter={renderFooter}
      />
    </div>
  )
}
export default Table
