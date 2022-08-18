import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useRecoilState } from 'recoil'
import { TableHeaderProps } from '../@types/frontend.types'
import { showUpdateDialogState } from '../atoms/showUpdateDialogAtom'

const TableHeader = ({
  setGlobalFilterValue,
  globalFilterValue,
  onGlobalFilterChange,
  setDisplayBasic,
  handleDeleteProduct
}:TableHeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const deleleteProduct = () => {
    handleDeleteProduct()
    setDisplayBasic(false)
  }
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
          onClick={deleleteProduct}
        />
        <Button
          label="Modificar"
          className="p-button-raised p-button-secondary"
          onClick={() => setShowUpdateDialog(true)}
        />
      </div>
    </div>
  )
}

export default TableHeader
