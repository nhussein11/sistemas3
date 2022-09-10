import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { isStoreCheckedState } from '../../atoms/stores/isStoreCheckedAtom'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import { TableHeaderProps } from '../../@types/frontend.types'
import useDeleteStoreMutation from '../../hooks/stores/useDeleteStoreMutation'
import { useRecoilState } from 'recoil'

const StoreTableHeader = ({ setDisplayBasic }:TableHeaderProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const [isStoreChecked] =
    useRecoilState(isStoreCheckedState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const { handleDeleteStore } = useDeleteStoreMutation('stores')
  const updateProduct = () => {
    isStoreChecked.checked
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
          onClick={handleDeleteStore}
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

export default StoreTableHeader
