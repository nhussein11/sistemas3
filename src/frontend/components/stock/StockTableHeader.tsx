import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { isStockCheckedState } from '../../atoms/stock/isStockSelectedAtom'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { StockTableHeaderProps } from '../../@types/frontend.types'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
// import useDeleteStockMutation from '../../hooks/stock/useDeleteStockMutation'
import { useRecoilState } from 'recoil'

const StockTableHeader = ({ setDisplayBasic }:StockTableHeaderProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const [isStockChecked] = useRecoilState(isStockCheckedState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  // const { handleDeleteStock } = useDeleteStockMutation('stocks')
  const updateStock = () => {
    isStockChecked.checked
      ? setShowUpdateDialog(true)
      : setShowErrorDialog(true)
  }
  return (
    <div className="header-table">
      <div className="flex justify-content-between">
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
          label="Modificar"
          className="p-button-raised p-button-secondary"
          onClick={updateStock}
        />
      </div>
    </div>
  )
}

export default StockTableHeader
