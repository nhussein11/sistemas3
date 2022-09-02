import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useRecoilState } from 'recoil'
import { StockTableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { isStockCheckedState } from '../../atoms/isStockSelectedAtom'
import { showErrorDialogState } from '../../atoms/showErrorDialog'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import useDeleteStockMutation from '../../hooks/stock/useDeleteStockMutation'

const StockTableHeader = ({ setDisplayBasic }:StockTableHeaderProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const [isStockChecked] = useRecoilState(isStockCheckedState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const { handleDeleteStock } = useDeleteStockMutation('stocks')
  const updateStock = () => {
    isStockChecked.checked
      ? setShowUpdateDialog(true)
      : setShowErrorDialog(true)
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
          onClick={handleDeleteStock}
        />
        <Button
          label="Modificar"
          className="p-button-raised p-button-secondary"
          onClick={updateStock}
        />
      </div>
    </div>
  )
}

export default StockTableHeader
