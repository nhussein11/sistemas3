import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const TableHeader = ({
  setGlobalFilterValue,
  globalFilterValue,
  onGlobalFilterChange,
  setDisplayBasic
}) => {
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

export default TableHeader
