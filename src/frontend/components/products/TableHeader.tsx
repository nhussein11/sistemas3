import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { TableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'

const TableHeader = ({
  setDisplayBasic,
  handleDeleteProduct,
  handleUpdateProduct
}: TableHeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const deleleteProduct = () => {
    handleDeleteProduct()
    setDisplayBasic(false)
  }
  const updateProduct = () => {
    handleUpdateProduct()
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
            onChange={(e) => setGlobalFilterValue(e.target.value)}
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
          onClick={updateProduct}
        />
      </div>
    </div>
  )
}

export default TableHeader
